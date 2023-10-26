"use strict";
const router = require("express").Router();
const counterDao = require("../controllers/dao-counters");

router.get("/", async (req, res) => {
  try {
    const counters = await counterDao.getCounters();
    res.json(counters);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/details', async (req, res, next) => {
  try {
    const counters = await counterDao.getCountersDetails();
    return res.json(counters);
  } catch {
    return next(err);
  }
});

router.get("/available", async (req, res) => {
  try {
    const counters = await counterDao.getAvailableCounters();
    res.json(counters);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Give Counter By Id
router.get("/:id", async (req, res) => {
  try {
    const counter = await counterDao.getCounterById(req.params.id);
    res.json(counter);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Give ticket by counterId
router.get("/:counterid/tickets", async (req, res) => {
  try {
    const ticket = await counterDao.getTicketByCounterId(req.params.counterid);

    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.countersRouter = router;
