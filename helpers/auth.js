/*This file is responsible for authenticating the user by verifying the JWT token passed in the headers.
If the token is valid, it decodes the token and adds the user data to the request object.
If the token is invalid, it returns an error message.
If there is no token, it passes the request to the next middleware function.*/

const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (app) => {
  app.use((req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return next();
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return next(err);
      }
      req.user = decoded.user;
      next();
    });
  });
};
