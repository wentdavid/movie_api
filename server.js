//declaration
const http = require('http'),
  url= require('url'),
  fs= require('fs');

//url module
const url = require('url');
let addr = request.url;
let q = new URL(addr, true);


 
 //http module
 http.createServer((request, response) => {
    let addr=request.url;
    let p=url.parse(addr, true);
    let filePath="";


  //logging timestamps
  
  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });

  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
      }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

  
 }).listen(8080);
 
 console.log('My first Node test server is running on Port 8080.');

  