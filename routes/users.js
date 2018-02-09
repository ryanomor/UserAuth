const express = require('express');
const router = express.Router();
const { loginRequired } = require("../auth/helpers");
const passport = require("../auth/local");
const db = require("../db/queries");

router.post("/new", db.checkUser ,db.createUser);

router.post("/login", passport.authenticate("local"), (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user;
  res.status(200).json({
    user: req.user.username,
    message: `${req.user.username} is logged in`
  });
  return;
});

router.get("/logout", loginRequired, db.logoutUser);

module.exports = router;
