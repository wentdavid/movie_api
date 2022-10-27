//importing express
const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'), // import built in node modules fs and path 
  path = require('path'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
  accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
  app.use(bodyParser.json());


let moviesTopten = [
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

  ];

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
  
  app.get('/movies', (req, res) => {
    res.json(moviesTopten);
  });

  //Error
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
  