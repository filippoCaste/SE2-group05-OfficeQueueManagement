"use strict";
const router = require("express").Router();
const login = require("../controllers/user.controller").login;

router.post("/", login);

// GET /api/sessions/current
// This route checks whether the user is logged in or not.
router.get("/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// DELETE /api/sessions/current
// This route is used for logging out the current user.
router.delete("/current", (req, res) => {
  req.logout(() => {
    res.status(200).json({});
  });
});

exports.sessionRouter = router;
