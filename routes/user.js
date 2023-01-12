/* This file exports a router that handles all the routes related to users.
It includes routes for registering a user and logging in a user.
The routes use express-validator to check the validation of the input. */

const express = require("express");
const router = express.Router();
const passport = require("../middlewares/passport");
const jwt = require("../middlewares/jwt");
const { check, validationResult } = require("express-validator");
const Models = require("../models/models");
const Users = Models.User;

router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const user = new Users(req.body);
    user.password = Users.hashPassword(user.password);
    user
      .save()
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => console.error(err));
  }
);

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  Users.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (!user.validatePassword(password)) {
        return res.status(400).json({ error: "Invalid Password" });
      }
      const token = jwt.sign(user);
      res.json({
        user,
        token,
      });
    })
    .catch((err) => console.error(err));
});

module.exports = router;

