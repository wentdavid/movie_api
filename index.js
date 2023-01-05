//decalring const
const express = require('express'),
      morgan = require('morgan'),
      fs = require('fs'), // import built in node modules fs and path 
      path = require('path'),
      app = express(),
      bodyParser = require('body-parser'),
      uuid = require('uuid'),
      methodOverride = require('method-override'),
      cors = require("cors");

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
 const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});
  app.use(morgan('combined', { stream: accessLogStream }));
  app.use(bodyParser.json());
  app.use(methodOverride());

//BodyParser middleware function
app.use(bodyParser.urlencoded({ extended: true}));

//Integrating CORS and allow requets from only CERTAIN origins
let allowedOrigins = ["http://localhost:8080", "http://testsite.com"];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      let message = "The CORS policy for this application doesn’t allow access from origin " + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));


//App argument ensures that Express is available in your “auth.js” file as well.
const auth = require('./auth')(app);

//Requireing the Passport module and importing the “passport.js”
const passport = require('passport');
app.use(passport.initialize());
require('./passport');


//Express-Validator
const { check, validateResult } = require("express-validator");


  //Integrating Mongoose 
  const mongoose = require('mongoose'),
        Models = require('./models.js');

  const Movies = Models.Movie,
        Users = Models.User,
        Genres = Models.Genre,
        Directors = Models.Director;

/* mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true }); // allows Mongoose to connect to the local database 
 */

process.env.CONNECTION_URI = 'mongodb://localhost:27017/myFlixDB';
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true, }); // allows Mongoose to connect to the database


  // setup the logger
  app.use(morgan('combined', {stream: accessLogStream}));

  app.use(express.static('public'));
  
  // GET requests
  app.get('/', (req, res) => {
    res.send('Welcome to my Movie API!');
  });
  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });

  // Get all movies
 /*  app.get('/movies', (req, res) => {
    res.json(movies);
  }); */

  app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

  // get movies by title
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.title})
  .then((movie) => {
    res.status(200).json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//Get genre by Name
app.get('/movies/genres/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.Name})
  .then((movies) => {
    res.send(movies.Genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//Get director data by Name
app.get('/movies/directors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({"Director.Name": req.params.Name})
  .then((movies) => {
    res.send(movies.Director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Get all user (Read in Mongoose)
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  //app.get("/users", function (req, res) {
  Users.find()
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


//Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username})
  .then((User) => {
    res.status(200).json(User)
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error ' + err)
  })
})

  //Error
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  

//CREATE (Allow new users to register)
/*app.post('/users', (req,res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  }else{
    res.status(400).send('users need names')
  }
})*/

// Add a user 
/* We'll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

// POST /users endpoint
app.post('/users',
//Validation logic here for request
[
  check("username", "Username is required").isLength({min:5}),
  check("username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
  check("password", "Password is required").not().isEmpty(),
  check("email", "Email does not appear to be valid").isEmail()
], (req, res) => {
  //check the validation object for errors
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) { //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + 'already exists');
      } else {

        Users.create({
            username: req.body.Username,
            password: req.body.Password,
            email: req.body.Email,
            birthday: req.body.Birthday
          })
          .then((user) => {res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


/*
//UPDATE (Allow users to update their user info (username))
app.put('/users/:id', (req,res) => {
  const {id} = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  }else{
    res.status(400).send('no such user')
  }

})
*/

// Update a user's info, by username
/* We'll expect  JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/

// Allow users update their user info (Update)
app.put('/users/:Username', passport.authenticate('jwt', { session: false }),
[ 
  check ('Username', 'Username is required').isLength({min: 5}),
  check ('Username', 'Username contains non alphanumeric character - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check ('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {

  let errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()});
  } 

  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate({ Username: req.params.Username},
    { 
      $set: {
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      },
    },
    {new: true }, //This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });


/*//CREATE (Allow users to add a movie to their list of favorites (showing only a text that a movie has been added)
app.post('/users/:id/:movieTitle', (req,res) => {
  const { id, movieTitle } = req.params;
  

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);;
  }else{
    res.status(400).send('no such user')
  }

})
*/

// Allow users add to their list of Favorites (create)
  app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true}, //This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  } );




//DELETE (Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later))
/* app.delete('/users/:id/:movieTitle', (req,res) => {
  const { id, movieTitle } = req.params;
  

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);;
  }else{
    res.status(400).send('no such user')
  }

}) */

//Delete movie from favorite list
  app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username}, {
      $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });

/*//DELETE (Allow existing users to deregister (showing only a text that a user email has been removed))
app.delete('/users/:id', (req,res) => {
  const { id } = req.params;
  

  let user = users.find( user => user.id == id);

  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);;
  }else{
    res.status(400).send('no such user')
  }

})
*/

//Allow existing users deregister
  app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if(!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.' );
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

  app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
  });


// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});
  
  