
"use strict";
const router = require("express").Router();
const counterDao = require("../controllers/dao-counters");


router.get("/counters", async (req, res) => {
    try {
      const counters = await counterDao.getCounters();
      res.json(counters);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //Give Counter By Id
  router.get("/counters/:id", async (req, res) => {
    try {
      const counter = await counterDao.getCounterById(req.params.id);
      res.json(counter);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

  exports.counterRouter = router;