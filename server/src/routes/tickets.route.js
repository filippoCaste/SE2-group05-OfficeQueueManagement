"use strict";
const router = require("express").Router();
const isLoggedIn = require("../config/configs").isLoggedIn;
const { check, validationResult, param } = require("express-validator");
const ticketDao = require("../controllers/dao-tickets");

// 1. Retrieve the list of all the available tickets.
// GET /api/tickets
// This route returns the tickets.
router.get(
  "/",
  // isLoggedIn, // Apply the isLoggedIn middleware
  async (req, res) => {
    try {
      const result = await ticketDao.getTickets();
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

/**
 * @returns the number of enqueued tickets before the last one
 */
router.get("/noEnqueued/:serviceId", async (req, res) => {
  try {
    const result = await ticketDao.getNumberOfEnqueuedTicketsPerService(
      req.params.serviceId
    );
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/noServed/:serviceId", async (req, res) => {
  try {
    const result = await ticketDao.getNumberOfServedTicketsPerService(
      req.params.serviceId
    );
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * Insert into the database a new ticket
 */
router.post("/print/:serviceId", async (req, res) => {
  try {
    await ticketDao.printTicketByService(req.params.serviceId);
    res.status(200).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @returns the last added ticket (to be called immediately after printTicket/:serviceId)
 */
router.get("/getAll", async (req, res) => {
  try {
    const ticket = await ticketDao.getAllTickets();
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. Retrieve an open ticket, given its serviceId
// GET /api/tickets/<serviceId>
// Given a service id, this route returns the oldest associated open ticket
// it also check credentials
router.get("/:serviceid", [check("id").isInt({ min: 1 })], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors
          .array()
          .map((error) => error.msg)
          .join(" "),
      });
    }
    const result = await ticketDao.getticketByService(req.params.id);
    if (result.error) {
      res.status(404).json(result);
    } else {
      const today = dayjs();
      const creationDate = dayjs(result.creationdate);
      if (req?.user || (creationDate.isValid() && today.isAfter(creationDate)))
        res.json(result);
      else
        return res.status(401).json({
          error: "Cannot retrieve that ticket because date is after today!",
        });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. Retrieve the list of all the available publicated ticketss.
// GET /api/tickets/publicated
// This route returns the tickets.
router.get("/publicated", async (req, res) => {
  try {
    const result = await ticketDao.getPublicatedticketss();
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
// 3. Retrieve a tickets, given its “id”.
// GET /api/ticketss/<id>
// Given a tickets id, this route returns the associated tickets and contents.
// it also check credentials
router.get("/:id", [check("id").isInt({ min: 1 })], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors
          .array()
          .map((error) => error.msg)
          .join(" "),
      });
    }
    const result = await ticketDao.getticketsById(req.params.id);
    if (result.error) {
      res.status(404).json(result);
    } else {
      const today = dayjs();
      const publicationDate = dayjs(result.publicationDate);
      if (
        req?.user ||
        (publicationDate.isValid() && today.isAfter(publicationDate))
      )
        res.json(result);
      else
        return res.status(401).json({ error: "Cannot retrieve that tickets" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// 4. Create a new tickets, by providing all relevant information.
// POST /api/tickets/add
// This route adds a new tickets to the tickets library.
// add is isLoggedIn
router.post(
  "/add",
  isLoggedIn,
  [
    check("title").isLength({ min: 2, max: 160 }),
    check("authorid").isInt({ min: 0 }),
    // only date (first ten chars) and valid ISO
    check("creationDate")
      .isLength({ min: 10, max: 10 })
      .isISO8601({ strict: true }),
    check("publicationDate")
      .isLength({ min: 10, max: 10 })
      .isISO8601({ strict: true })
      .optional({ checkFalsy: true }),
    check("contents").isArray({ min: 2 }),
  ],
  async (req, res) => {
    // Is there any validation error?
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors
          .array()
          .map((error) => error.msg)
          .join(" "),
      });
    }
    const hasHeader = req.body.contents.some((obj) => obj.type === "header");
    const hasImageOrParagraph = req.body.contents.some(
      (obj) => obj.type === "image" || obj.type === "paragraph"
    );
    if (hasHeader === false || hasImageOrParagraph === false) {
      return res
        .status(422)
        .json({ error: "didn't provide the minimum number of blocks" });
    }
    const creationDate = dayjs(req.body.creationDate);
    const publicationDate = req.body.publicationDate
      ? dayjs(req.body.publicationDate)
      : "";
    if (publicationDate !== "" && creationDate.isAfter(publicationDate)) {
      return res
        .status(422)
        .json({ error: "creation date cannot be after the publication date" });
    }
    const tickets = {
      title: req.body.title,
      authorid: req.body.authorid,
      creationDate: req.body.creationDate,
      publicationDate: req.body.publicationDate,
      contents: req.body.contents,
    };
    try {
      const result = await ticketDao.createtickets(tickets); // NOTE: createtickets returns the newly created object
      res.json(result);
    } catch (err) {
      res.status(503).json({
        error: `Database error during the creation of a new tickets: ${err}`,
      });
    }
  }
);
// 5. Update an existing tickets, by providing all the relevant information
// PUT /api/tickets/<id>
// This route allows to modify a tickets, specifying its id and the necessary data.
router.put(
  "/:id",
  isLoggedIn,
  [
    check("title").isLength({ min: 2, max: 160 }),
    check("authorid").isInt({ min: 0 }),
    check("creationDate")
      .isLength({ min: 10, max: 10 })
      .isISO8601({ strict: true }),
    check("publicationDate")
      .isLength({ min: 10, max: 10 })
      .isISO8601({ strict: true })
      .optional({ checkFalsy: true }),
    check("contents").isArray({ min: 2 }),
  ],
  async (req, res) => {
    //validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors
          .array()
          .map((error) => error.msg)
          .join(" "),
      });
    }
    // body id == req id
    if (req.body.id != Number(req.params.id)) {
      return res.status(422).json({ error: "URL and body id mismatch" });
    }
    const resulttickets = await ticketDao.getticketsById(req.params.id);
    if (resulttickets.error) return res.status(404).json(resulttickets);
    if (
      !req.hasOwnProperty("user") ||
      (req.user.id != resulttickets.authorid && req.user.role != "admin")
    ) {
      return res.status(401).json({ error: "User cannot do this operation" });
    }
    // check if the blocks type match specifications
    const hasHeader = req.body.contents.some((obj) => obj.type === "header");
    const hasImageOrParagraph = req.body.contents.some(
      (obj) => obj.type === "image" || obj.type === "paragraph"
    );
    if (hasHeader === false || hasImageOrParagraph === false) {
      return res
        .status(422)
        .json({ error: "didn't provide the minimum number of blocks" });
    }
    // check if the publication date is after the creation date
    const creationDate = dayjs(req.body.creationDate);
    const publicationDate = req.body.publicationDate
      ? dayjs(req.body.publicationDate)
      : "";
    if (publicationDate !== "" && creationDate.isAfter(publicationDate)) {
      return res.status(422).json({
        error: "creation date cannot be greater than the publication date",
      });
    }
    const tickets = {
      title: req.body.title,
      authorid: req.body.authorid,
      creationDate: req.body.creationDate,
      publicationDate: req.body.publicationDate,
      contents: req.body.contents,
    };
    try {
      const ticketsChecked = await ticketDao.getticketsById(req.params.id);
      if (ticketsChecked.error) return res.status(404).json(ticketsChecked);
      const result = await ticketDao.updatetickets(req.params.id, tickets); // NOTE: updatetickets returns the newly updated object
      res.status(200).json(result);
    } catch (err) {
      res.status(503).json({
        error: `Database error during the creation of the updated tickets: ${err}`,
      });
    }
  }
);

// */
exports.ticketsRouter = router;
