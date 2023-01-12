/* This file exports a Mongoose model for the Director schema.
It includes the fields for name, bio, and birth.
 */

const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  birth: { type: Date, required: true },
});

const Director = mongoose.model("Director", directorSchema);

module.exports = Director;
