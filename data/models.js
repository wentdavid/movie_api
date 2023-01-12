/*This file exports all the models from other files, so that they can be imported and used in other files.*/
const User = require("./models/user");
const Movie = require("./models/movie");
const Genre = require("./models/genre");
const Director = require("./models/director");

module.exports = { User, Movie, Genre, Director };
