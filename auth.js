/**
 * The secret key used in the JWTStrategy for user authentication.
 * @type {string}
 */
const jwtSecret = "your_jwt_secret";
const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport"); // Your local passport file

/**
 * This method generates a JWT token for user authentication.
 * @name generateJWTToken
 * @function
 * @param {object} user - The user object to be encoded in the JWT.
 * @returns {string} Returns a JWT token.
 */
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // This is the username you’re encoding in the JWT
    expiresIn: "30d", // This specifies that the token will expire in 30 days
    algorithm: "HS256", // This is the algorithm used to “sign” or encode the values of the JWT
  });
};

/**
 * This method authenticates the user and generates a JWT token for login.
 * @name login
 * @function
 * @param {object} router - The router object to handle HTTP requests.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} Returns the user and JWT token if successful, or an error message if not.
 */
module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
