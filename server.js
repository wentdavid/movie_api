//url module
const url = require('url');
let addr = request.url;
let q = new URL(addr, true);

console.log(q.host); // returns 'localhost:8080'
console.log(q.pathname); // returns '/#.html'
console.log(q.search); // returns everything after the .html
 
 //http module
 const http = require('http');

 http.createServer((request, response) => {
   response.writeHead(200, {'Content-Type': 'text/plain'});
   response.end('Hello Node!\n');
   
   if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });
 }).listen(8080);
 
 console.log('My first Node test server is running on Port 8080.');

  