/*This file is responsible for handling CORS(Cross-Origin Resource Sharing) related issues in your application.
It exports a middleware function that is used to set the allowed origins in an array and will return an error if request is coming from an origin that is not in the allowed origins array.*/

const cors = require("cors");

module.exports = (app) => {
  const allowedOrigins = [
    "http://localhost:8080",
    "http://localhost:1234",
    "http://testsite.com",
    "https://sheltered-crag-54265.herokuapp.com/",
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          let message =
            "The CORS policy for this application doesn’t allow access from origin " +
            origin;
          return callback(new Error(message), false);
        }
        return callback(null, true);
      },
    })
  );
};
