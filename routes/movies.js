/* This file exports a router that handles all the routes related to movies.
It includes routes for getting all movies, getting a specific movie, and adding a movie.
The routes are secured with JWT authentication and it also uses express-validator to check the validation of the input.
 */

const express = require("express");
const router = express.Router();
const passport = require("../middlewares/passport");
const jwt = require("../middlewares/jwt");
const { check, validationResult } = require("express-validator");
const Models = require("../models/models");
const Movies = Models.Movie;
const Users = Models.User;

// Get all movies
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .then((movie) => res.json(movie))
      .catch((err) => console.error(err));
  }
);

// Get a specific movie
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ _id: req.params.id })
      .then((movie) => res.json(movie))
      .catch((err) => console.error(err));
  }
);
// Add a movie
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  [
    check("Title", "Title is required").not().isEmpty(),
    check("Description", "Description is required").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const movie = new Movies(req.body);
    movie
      .save()
      .then((movie) => res.status(201).json(movie))
      .catch((err) => console.error(err));
  }
);

module.exports = router;
