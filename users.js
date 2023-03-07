const express = require('express');
const router = express.Router();
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const Models = require('./models.js');
const Users = Models.User;

// GET all users
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET user by username
router.get('/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Confirm Updates via password verification
router.post(
  "/verify-password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.body.username }, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error: " + err);
      }
      if (!user) {
        return res.status(404).send("User not found");
      }
      // Use the validatePassword method to check if the entered password is correct
      let isValid = user.validatePassword(req.body.password);
      if (!isValid) {
        return res.status(401).send("Incorrect password");
      }
      // If the password is correct, return a success message
      return res.status(200).send({ success: true });
    });
  }
);

// POST new user
router.post(
  '/',
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const hashedPassword = Users.hashPassword(req.body.Password);
    const user = new Users({
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birthday: req.body.Birthday,
    });
    Users.findOne({ Username: req.body.Username })
      .then((result) => {
        if (result) {
          return res.status(400).send('Username already exists');
        } else {
          user.save((err) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error: ' + err);
            } else {
              res.status(201).send('User created successfully');
            }
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// PUT user information by username
router.put('/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  const hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate(
    { Username: req.params.username },
    {
      $set: {
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// DELETE user by username
router.delete('/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.username })
  .then((user) => {
    if (!user) {
      res.status(404).send('User not found');
} else {
  res.status(200).send('User deleted successfully');
}
})
.catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
});
});

// POST favorite movie to user by username and movie ID
router.post('/:username/movies/:movieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.username },
    { $push: { FavoriteMovies: req.params.movieID } },
    { new: true },(err, updatedUser) => {if (err) {console.error(err);
      res.status(500).send('Error: ' + err);
} else {
  res.json(updatedUser);
}
}
);
});

// DELETE favorite movie from user by username and movie ID
router.delete('/:username/movies/:movieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.username },
    { $pull: { FavoriteMovies: req.params.movieID } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    }
    );
});

module.exports = router;