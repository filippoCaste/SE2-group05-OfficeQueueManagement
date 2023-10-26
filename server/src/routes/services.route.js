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

router.get("/:id/services", async (req, res) => {
  try {
    const services = await serviceDao.getServicesByCounterId(req.params.id);
    res.json(services);
  } catch (err) {
    res.status(500).json(err);
  }
});


exports.servicesRouter = router;