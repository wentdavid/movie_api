/*This file exports two functions, one for signing a JWT token and the other for verifying a JWT token.
The sign function takes in a user object and the secret from the config file, and returns a signed JWT token.
The verify function takes in a token and the secret from the config file and returns the decoded payload of the token.*/

const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = {
  sign(user) {
    return jwt.sign({ user }, config.secret, { expiresIn: "1h" });
  },
  verify(token) {
    return jwt.verify(token, config.secret);
  },
};
