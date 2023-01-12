/* This file handles the logic for authenticating users, such as setting up the passport strategy and handling the logic for deserializing and serializing users.
 */

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Models = require("../models/models");
const Users = Models.User;

passport.use(
  new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
    Users.findOne({ username: username })
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (!user.validatePassword(password)) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      })
      .catch(done);
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id)
    .then(user => {
      done(null, user);
    })
});

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "your_jwt_secret",
};

passport.use(
  new JWTStrategy(opts, (jwt_payload, done) => {
    try {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.error(err));
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
