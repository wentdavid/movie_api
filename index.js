//decalring const
const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"), // import built in node modules fs and path
  path = require("path"),
  app = express(),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  methodOverride = require("method-override"),
  cors = require("cors");

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const moviesRouter = require("./movies");
app.use("/movies", moviesRouter);

const usersRouter = require("./users");
app.use("/users", usersRouter);

//Integrating CORS and allow requets from only CERTAIN origins
let allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:1234",
  "http://localhost:4200",
  "http://testsite.com",
  "https://sheltered-crag-54265.herokuapp.com/",
  "https://gleans-moviedb.netlify.app",
  "https://wentdavid.github.io/myFlix-Angular-client",
  "https://wentdavid.github.io"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        let message =
          "The CORS policy for this application doesn’t allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);


//App argument ensures that Express is available in your “auth.js” file as well.
const auth = require("./auth")(app);

//Requireing the Passport module and importing the “passport.js”
const passport = require("passport");
app.use(passport.initialize());
require("./passport");

//Express-Validator
const { check, validationResult } = require("express-validator");

//Integrating Mongoose
const mongoose = require("mongoose"),
  Models = require("./models.js");

const Movies = Models.Movie,
  Users = Models.User,
  Genres = Models.Genre,
  Directors = Models.Director;

/* mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true }); // allows Mongoose to connect to the local database
 */

// process.env.CONNECTION_URI = 'mongodb://localhost:27017/myFlixDB';

//for online database process.env.Variable name ro secure connection URI
mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB Connected")); // if it successfully connects

// setup the logger
app.use(morgan("common", { stream: accessLogStream }));

//default text response
app.get("/", (req, res) => {
  res.send("Welcome to my Movie API!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

// listen for requests
const port = process.env.PORT || 8080;

app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
