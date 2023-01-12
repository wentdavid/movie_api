/*This file is responsible for connecting to the MongoDB database using Mongoose.
It uses the config.db.uri property to connect to the database.
It also logs a message to the console when the connection is successful or if there is an error.*/

const mongoose = require("mongoose");
const config = require("../config/config");

mongoose.connect(config.db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

module.exports = db;
