/**

Mongoose schemas for movies and users.
@module models
@requires mongoose
@requires bcrypt
*/
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**

Mongoose schema for movies.
@typedef {Object} MovieSchema
@property {string} Title - The title of the movie.
@property {string} Description - A brief description of the movie.
@property {Object} Genre - The genre of the movie.
@property {string} Genre.Name - The name of the genre.
@property {string} Genre.Description - A brief description of the genre.
@property {Object} Director - The director of the movie.
@property {string} Director.Name - The name of the director.
@property {string} Director.Bio - A brief biography of the director.
@property {Date} Director.Birth - The date of birth of the director.
@property {string[]} Actors - An array of the actors in the movie.
@property {string} ImageUrl - The URL of the movie's poster image.
@property {boolean} Featured - A flag indicating whether the movie is featured.
*/
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: Date,
  },
  Actors: [String],
  ImageUrl: String,
  Featured: Boolean,
});

/**

Mongoose schema for users.
@typedef {Object} UserSchema
@property {string} Username - The username of the user.
@property {string} Password - The password of the user.
@property {string} Email - The email address of the user.
@property {Date} Birthday - The birth date of the user.
@property {Object[]} FavoriteMovies - An array of the user's favorite movies.
@property {mongoose.Schema.Types.ObjectId} FavoriteMovies._id - The unique ID of the favorite movie.
*/
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: false },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

/**

Method for hashing a user's password.
@function hashPassword
@memberof UserSchema
@param {string} Password - The user's password.
@returns {string} The hashed password.
*/
userSchema.statics.hashPassword = (Password) => {
  return bcrypt.hashSync(Password, 10);
};

/**

Method for validating a user's password.
@function validatePassword
@memberof UserSchema
@param {string} password - The user's password.
@returns {boolean} True if the password is valid, false otherwise.
*/
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

/**

Mongoose model for movies.
@typedef {Object} MovieModel
*/
let Movie = mongoose.model("Movie", movieSchema);

/**

Mongoose model for users.
@typedef {Object} UserModel
*/
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
