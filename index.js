//decalring const
const express = require('express'),
      morgan = require('morgan'),
      fs = require('fs'), // import built in node modules fs and path 
      path = require('path'),
      app = express(),
      bodyParser = require('body-parser'),
      uuid = require('uuid'),
      methodOverride = require('method-override'),

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
  accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
  app.use(bodyParser.json());
  app.use(methodOverride());

//BodyParser middleware function
app.use(bodyParser.urlencoded({ extended: true}));

//App argument ensures that Express is available in your “auth.js” file as well.
let auth = require("./auth")(app);



  //Integrating Mongoose 
  const mongoose = require('mongoose'),
        Models = require('./models.js');

  const Movies = Models.Movie,
        Users = Models.User,
        Genres = Models.Genre,
        Directors = Models.Director;

  mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true }); // allows Mongoose to connect to the database


/* let moviesTopten = [
        {
            title: 'Harry Potter and the Sorcerer\'s Stone',
            author: 'J.K. Rowling'
        },
        {
            title: 'Lord of the Rings',
            author: 'J.R.R. Tolkien'
        },
        {
            title: 'Twilight',
            author: 'Stephanie Meyer'
        },
        {
            title: 'Harry Potter and the Sorcerer\'s Stone',
            author: 'J.K. Rowling'
        },
        {
            title: 'Lord of the Rings',
            author: 'J.R.R. Tolkien'
        },
        {
            title: 'Twilight',
            author: 'Stephanie Meyer'
        },
        {
            title: 'Twilight',
            author: 'Stephanie Meyer'
        },
        {
            title: 'Harry Potter and the Sorcerer\'s Stone',
            author: 'J.K. Rowling'
        },
        {
            title: 'Lord of the Rings',
            author: 'J.R.R. Tolkien'
        },
        {
            title: 'Twilight',
            author: 'Stephanie Meyer'
        }

  ]; */

 /*  let users = [
    {
        id: 1,
        name: 'David',
        favoriteMovies:['Harry Potter'],
        
    },
    {
        id: 2,
        name: 'testuser',
        favoriteMovies:[]
        
    },
]; */

/* let movies = [
    {
        'Title': 'Harry Potter',
        'Description': 'This is the description of the Harry Potter movie',
        'Genre': {
          'Name':'Fantasy',
          'Description':'Example Description for Fantasy genre',
        },
        'Director': {
            'Name': 'JK Rowling',
            'Bio': 'Example Bio of this director',
            'Birth': 1960,
        },
        'ImageUrl': 'https://imgs.search.brave.com/qaTuE6ntHZFJ2DoF6goAewvM7aUG3LdJNJY7CryMAXQ/rs:fit:800:1200:1/g:ce/aHR0cHM6Ly93d3cu/dGVzdGVkaWNoLmRl/L3F1aXo1OC9waWN0/dXJlL3BpY18xNTQ1/MDY3OTgwXzUuanBn',
        'Featured': false,
    },
    {
      'Title': 'Harry Potter 2',
      'Description': 'This is the description of the Harry Potter movie',
      'Genre': {
        'Name':'Sci-Fi',
        'Description':'Example Description for Fantasy genre',
      },
      'Director': {
          'Name': 'JK Rowling',
          'Bio': 'Example Bio of this director',
          'Birth': 1960,
      },
      'ImageUrl': 'https://imgs.search.brave.com/qaTuE6ntHZFJ2DoF6goAewvM7aUG3LdJNJY7CryMAXQ/rs:fit:800:1200:1/g:ce/aHR0cHM6Ly93d3cu/dGVzdGVkaWNoLmRl/L3F1aXo1OC9waWN0/dXJlL3BpY18xNTQ1/MDY3OTgwXzUuanBn',
      'Featured': false,
  },
]; */


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

  app.get('/movies', (req, res) => {
    Movies.find()
    .then(function (movies) {
      res.status(201).json(movies);
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
  });

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

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users.create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
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

app.put('/users/:Username' , (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {$set:
  {
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
  }
},
{ new: true }, //This line makes sure that the updated document is returned
(err, updatedUser) => {
  if(err) {
    console.error(err);
    res.status(500).send('Error:' + err);
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

// Add a movie to a user's list  of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    { $push: { FavoriteMovies: req.params.MovieID}
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: + err');
    } else {
      res.json(updatedUser);
    }
  });
});



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

app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieID}
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: + err');
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

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove ({ Username: req.params.Username })
  .then ((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + ' was no found');
    } else {
      res.status(200).send(req.params.Username + ' was deleted.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send ('Error:' + err);
  });
});


//READ (Return data (description, genre, director, image URL) about a single movie by title to the user)
/* app.get('/movies/:title',(req,res) => {
  const {title} = req.params;
  const movie = movies.find(movie => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie')
  }
}) */

app.get('/movies/:title', (req, res) => {
  Movies.find({Title: req.params.title})
  .then((movie) => {
    res.status(200).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});



//READ (Return data about a genre (description) by title)
/* app.get('/movies/genre/:genreName',(req,res) => {
  const {genreName} = req.params;
  const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre')
  }
}) */

app.get('/movies/genres/:Name', (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.Name})
  .then((movies) => {
    res.send(movies.Genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("No such genre. Error: " + err);
  });
});

//READ (Return data about a director (bio, birth year) by name)
/* app.get('/movies/directors/:directorName',(req,res) => {
  const {directorName} = req.params;
  const director = movies.find(movie => movie.Director.Name === directorName).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director')
  }
}) */

app.get('/movies/directors/:Name', (req, res) => {
  Movies.findOne({ "Director.Name": req.params.Name})
  .then((movies) => {
    res.send(movies.Director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("No such director. Error: " + err);
  });
});




  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
  