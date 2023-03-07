const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const uuid = require("uuid");
const methodOverride = require("method-override");
const cors = require("cors");
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this application doesn’t allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

const auth = require("./auth")(app);

app.use(passport.initialize());
require("./passport");

const mongoose = require("mongoose");
const MoviesRouter = require("./movies");
const UsersRouter = require("./users");
const Models = require("./models.js");
const Movies = Models.Movie;
const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB Connected"));

app.use(morgan("common", { stream: accessLogStream }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to my Movie API!");
});

app.use("/movies", MoviesRouter);
app.use("/users", UsersRouter);

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
      let isValid = user.validatePassword(req.body.password);
      if (!isValid) {
        return res.status(401).send("Incorrect password");
      }
      return res.status(200).send({ success: true });
    });
  }
);

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
