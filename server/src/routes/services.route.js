"use strict";
const router = require("express").Router();
const serviceDao = require("../controllers/dao-services");

router.get("/", async (req, res) => {
  try {
    const services = await serviceDao.getServices();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/counters", async (req, res) => {
  try {
    const counters = await serviceDao.getCounters();
    res.json(counters);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Give Counter By Id
router.get("/counters/:id", async (req, res) => {
  try {
    const counter = await serviceDao.getCounterById(req.params.id);
    res.json(counter);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.servicesRouter = router;