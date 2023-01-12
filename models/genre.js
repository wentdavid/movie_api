/* This file exports a Mongoose model for the Genre schema.
It includes the fields for name, description.
 */
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
