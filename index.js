/* This file is the entry point of this application and it sets up the express server and connects it to the middlewares, routes and the database.
It also defines the routes for the index page and the movies and users routes.
It uses require('./config/config') to import the configuration from config.js.
Then it uses require('./routes/movies') and require('./routes/users') to import the routes for movies and users.
It also imports the middlewares such as passport and jwt and use them to protect the routes.
It uses app.listen(process.env.PORT || 3000) to start the server on port 3000 or the one defined in the config.
 */

const express = require("express"),
  morgan = require("morgan"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  cors = require("cors");

require("./config/config");

const MoviesRoutes = require("./routes/movie");
const UsersRoutes = require("./routes/user");
const passport = require("./middlewares/passport");
const jwt = require("./middlewares/jwt");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.use(cors());

app.use(passport.initialize());
app.use("/movies", MoviesRoutes);
app.use("/users", UsersRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to my Movie API!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
});
