const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  genre: {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  director: {
    name: { type: String, trim: true },
    bio: { type: String, trim: true },
    birth: Date,
  },
  actors: [{ type: String, trim: true }],
  imageUrl: { type: String, trim: true },
  featured: Boolean,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
