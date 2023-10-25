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
router.get("/getAllTickets", async (req, res) => {
  try {
    const ticket = await ticketDao.getAllTickets();
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/counters/:counterid/tickets", async (req, res) => {
  try {
    console.log("here")
    const ticket = await ticketDao.getTicketByCounterId(req.params.counterid);
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

// */
exports.ticketsRouter = router;
