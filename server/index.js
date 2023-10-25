"use strict";
/*** Importing modules ***/
const express = require("express"); // The core Express module that allows you to create a simple and extensible web server web framework
const morgan = require("morgan"); //  A logging middleware that logs HTTP requests to the console.
const cors = require("cors"); //  A middleware that enables Cross-Origin Resource Sharing, allowing requests from different origins.

const userDao = require("./src/controllers/dao-users"); // module for accessing the user table in the DB

const sessionRoutes = require("./src/routes/session.route.js").sessionRouter;
const userRoutes = require("./src/routes/user.route.js").userRouter;
const ticketsRoutes = require("./src/routes/tickets.route.js").ticketsRouter;
const servicesRoutes = require("./src/routes/services.route.js").servicesRouter;

/*** init express and set up the middlewares ***/
const app = express(); // application object app
app.use(morgan("dev")); // Register a middleware
app.use(express.json());
/** Set up and enable Cross-Origin Resource Sharing (CORS) **/
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
/*** Passport ***/
/** Authentication-related imports **/
const passport = require("passport"); // authentication middleware
const strategy = require("./src/config/configs.js").strategy;

/** Set up authentication strategy to search in the DB a user with a matching password.
 * The user object will contain other information extracted by the method userDao.getUser (i.e., id, username, name).
 **/
passport.use(strategy);

//After enabling sessions, you should decide which info to put into them for generating the cookie
// Serializing in the session the user object given from LocalStrategy(verify).
//Passport takes that user info and stores it internally on req.session.passport
passport.serializeUser(function (user, callback) {
  // this user is id + username + name + role
  callback(null, user);
});
// Starting from the data in the session, we extract the current (logged-in) user.
passport.deserializeUser(function (user, callback) {
  // this user is id + email + name + role
  return callback(null, user); // this will be available in req.user
});
/** Creating the session */
const session = require("express-session"); // A session is temporary data interchanged between two or more parties
// express-session stores the session in memory
app.use(
  session({
    // Upon authentication, The server replies to the login HTTP request by creating and sending a cookie (stored into server session storage)
    secret: "shhhhh... it's a secret!", // it is used to verify the integrity of the session data. It ensures that the session data has not been tampered with by unauthorized parties. SESSIONID
    resave: false, // forces the session to be saved back to the session store, even if thE session was never modified during the request, FALSE
    saveUninitialized: false, // forces a session that is new but not modified to be saved to the store
  })
);
app.use(passport.authenticate("session")); // authentication middleware to authenticate users in Express

app.use("/api/sessions", sessionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/services", servicesRoutes);

// Activating the server
const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
); // starts the server on the specified port
