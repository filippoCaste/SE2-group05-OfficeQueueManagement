'use strict';
const passport = require("passport");
const strategy = require("../config/configs").strategy;

passport.use(strategy);

exports.login = function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).send("User not found");
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);
      // req.user contains the authenticated user, we send all the user info back
      return res.status(201).json(req.user);
    });
  })(req, res, next);
};
