/* This file exports a Mongoose model for the Movie schema.
It includes the fields for title, description, genre, director, actors, imageUrl, and featured.
 */

const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: {
    name: String,
    description: String,
  },
  director: {
    name: String,
    bio: String,
    birth: Date,
  },
  actors: [String],
  imageUrl: String,
  featured: Boolean,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
