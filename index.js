/**
 * Initializes Express and imports necessary modules
 * @module app
 * @requires express
 * @requires morgan
 * @requires fs
 * @requires path
 * @requires body-parser
 * @requires uuid
 * @requires method-override
 * @requires cors
*/
const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"), // built-in Node.js module
  path = require("path"), // built-in Node.js module
  app = express(),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  methodOverride = require("method-override"),
  cors = require("cors");

/**
 * Create a write stream to log requests to a file called 'log.txt' in the root directory
 * @const {Object} accessLogStream
 */
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream })); // use Morgan middleware to log all requests to the 'log.txt' file
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // use bodyParser middleware to parse incoming request bodies

/**
 * Define the origins that are allowed to make requests to the API using the CORS middleware
 * @const {Array} allowedOrigins
 */
let allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:1234",
  "http://localhost:4200",
  "http://testsite.com",
  "https://sheltered-crag-54265.herokuapp.com/",
  "https://gleans-moviedb.netlify.app",
  "https://wentdavid.github.io/myFlix-Angular-client",
  "https://wentdavid.github.io",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow requests with no origin
      if (allowedOrigins.indexOf(origin) === -1) {
        // if a specific origin isn’t found on the list of allowed origins
        let message =
          "The CORS policy for this application doesn’t allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

/**
 * Require auth module, passing app as an argument to ensure Express is available in "auth.js" file
 * @const {Object} auth
 */
const auth = require("./auth")(app);

/**
 * Require Passport module and import passport.js file
 * @const {Object} passport
 */
const passport = require("passport");
app.use(passport.initialize());
require("./passport");

/**
 * Require and configure Express-Validator
 * @const {Object} check
 * @const {Function} validationResult
 */
const { check, validationResult } = require("express-validator");

/**
 * Require and configure Mongoose and import models.js file
 * @const {Object} mongoose
 * @const {Object} Models
 * @const {Object} Movies
 * @const {Object} Users
 * @const {Object} Genres
 * @const {Object} Directors
 */

const mongoose = require("mongoose"),
  Models = require("./models.js");

const Movies = Models.Movie,
  Users = Models.User,
  Genres = Models.Genre,
  Directors = Models.Director;

/**
 * Connect to MongoDB database using a secure connection URI
 * @function
 */
mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB Connected")); // if it successfully connects

/**
 * Use Morgan middleware to log all requests to a file called 'log.txt' in the root directory
 * Serve static files from the 'public' folder
 * @function
 * @param {string} "common" - format of logged messages
 * @param {Object} { stream: accessLogStream } - stream object specifying the file to log to
 */
app.use(morgan("common", { stream: accessLogStream }));
app.use(express.static("public"));

/**
 * Responds with default text message when the root URL is accessed
 * @function
 * @param {Object} req - the HTTP request object
 * @param {Object} res - the HTTP response object
 */

app.get("/", (req, res) => {
  res.send("Welcome to my Movie API!");
});

/**
 * Sends the 'documentation.html' file from the 'public' folder when the '/documentation' URL is accessed
 * @function
 * @param {Object} req - the HTTP request object
 * @param {Object} res - the HTTP response object
 */
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

/**
 * Responds with all movies in the database
 * @function
 * @param {string} "/movies" - the URL path for this endpoint
 * @param {function} passport.authenticate - authenticate requests using JWT token
 * @param {Object} req - the HTTP request object
 * @param {Object} res - the HTTP response object
 */
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

/**
 * Responds with a movie that matches the given title
 * @function
 * @param {string} "/movies/:title" - the URL path for this endpoint with a title parameter
 * @param {function} passport.authenticate - authenticate requests using JWT token
 * @param {Object} req - the HTTP request object with title parameter in URL
 * @param {Object} res - the HTTP response object
 */
app.get(
  "/movies/:title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.title })
      .then((movie) => {
        res.status(200).json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Responds with all movies that match the given genre name
 * @function
 * @param {string} "/movies/genres/:Name" - the URL path for this endpoint with a Name parameter
 * @param {function} passport.authenticate - authenticate requests using JWT token
 * @param {Object} req - the HTTP request object with Name parameter in URL
 * @param {Object} res - the HTTP response object
 */
app.get(
  "/movies/genres/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.Name })
      .then((movies) => {
        res.send(movies.Genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Responds with the director data that matches the given name
 * @function
 * @param {string} "/movies/directors/:Name" - the URL path for this endpoint with a Name parameter
 * @param {function} passport.authenticate - authenticate requests using JWT token
 * @param {Object} req - the HTTP request object with Name parameter in URL
 * @param {Object} res - the HTTP response object
 */
app.get(
  "/movies/directors/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name })
      .then((movies) => {
        res.send(movies.Director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Responds with all users in the databas
 * @function
 * @param {string} "/users" - the URL path for this endpoint
 * @param {function} passport.authenticate - authenticate requests using JWT token
 * @param {Object} req - the HTTP request object
 * @param {Object} res - the HTTP response object
 */
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Responds with the user that matches the given username
 * @function
 * @param {string} "/users/:Username" - the URL path for this endpoint with a Username parameter
 * @param {function} passport.authenticate - authenticate requests using JWT token
 * @param {Object} req - the HTTP request object with Username parameter in URL
 * @param {Object} res - the HTTP response object
 */
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((User) => {
        res.status(200).json(User);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error " + err);
      });
  }
);

/**
 * Express error handler middleware that logs the error stack and responds with a 500 status and message
 * @function
 * @param {Object} err - the error object
 * @param {Object} req - the HTTP request object
 * @param {Object} res - the HTTP response object
 * @param {function} next - the next middleware function in the chain
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

/**
 * Allows new users to register by creating a new user document in the database
 * @function
 * @param {string} "/users" - the URL path for this endpoint
 * @param {Array} [check(...)] - an array of middleware functions for validating the request parameters
 * @param {Object} req - the HTTP request object with user data in the request body
 * @param {Object} res - the HTTP response object
 */
app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + "already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

/**
 * Allows users to update their user information in the database
 * @function
 * @param {string} "/users/:Username" - the URL path for this endpoint with a Username parameter
 * @param {function} passport.authenticate - authenticate requests using JWT token
 * @param {Array} [check(...)] - an array of middleware functions for validating the request parameters
 * @param {Object} req - the HTTP request object with user data in the request body and Username parameter in URL
 * @param {Object} res - the HTTP response object
 */
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric character - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate(
      { Username: req.params.Username },
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
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

/**
 * Allow users to add a movie to their list of favorites.
 * @name POST/users/:Username/movies/:MovieID
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} req.params.Username - The username of the user.
 * @param {string} req.params.MovieID - The ID of the movie to be added to the user's favorites.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {function} next - The Express middleware function.
 * @returns {Object} The updated user object with the newly added movie in their favorite movies list.
 */
app.post(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }, //This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          return next(err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

/**
 * Allow users to delete a movie from their list of favorites.
 * @name DELETE/users/:Username/movies/:MovieID
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} req.params.Username - The username of the user.
 * @param {string} req.params.MovieID - The ID of the movie to be removed from the user's favorites.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {function} next - The Express middleware function.
 * @returns {Object} The updated user object with the removed movie from their favorite movies list.
 */
app.delete(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: { FavoriteMovies: req.params.MovieID },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          return next(err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

/**
 * This method allows existing users to be deregistered from the application.
 * @name deleteUsers
 * @function
 * @memberof app
 * @param {string} req.params.Username - The username of the user to be deleted.
 * @param {function} passport.authenticate - Passport authentication middleware.
 * @param {object} res - Express response object.
 * @returns {string} Returns a status message indicating success or failure.
 */
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * This method verifies the user's password before allowing updates to be made.
 * @name verifyPassword
 * @function@memberof app
 * @param {string} req.body.username - The username of the user.
 * @param {string} req.body.password - The password entered by the user.
 * @param {function} passport.authenticate - Passport authentication middleware.
 * @param {object} res - Express response object.
 * @returns {string} Returns a success or error message.
 */
app.post(
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

/**
 * This method listens for requests on the specified port.
 * @name listen
 * @function
 * @memberof app
 * @param {number} port - The port to listen on.
 * @param {string} "0.0.0.0" - The IP address to listen on.
 * @param {function} callback - Callback function to be called once the server is listening.
 * @returns {string} Returns a console log message indicating the server is listening.
 */

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
