/* This file exports all the models in one place so that they can be imported and used in other parts of the application.
 */

const Movie = require("./movie");
const User = require("./user");
const Genre = require("./genre");
const Director = require("./director");

module.exports = {
  Movie,
  User,
  Genre,
  Director,
};
