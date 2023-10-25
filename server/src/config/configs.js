"use strict";
const LocalStrategy = require("passport-local").Strategy;
const userDao = require("../controllers/dao-users");

exports.strategy = new LocalStrategy(async function verify(
  username,
  password,
  callback
) {
  const user = await userDao.getUser(username, password);
  if (!user) return callback(null, false, "Incorrect username or password");
  return callback(null, user); // NOTE: user info in the session (all fields returned by userDao.getUser, i.e., id, username, name)
});

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ error: "Not authorized" });
  }
};
