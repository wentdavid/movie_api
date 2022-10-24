//url module
const url = require('url');
let addr = request.url;
let q = new URL(addr, true);

console.log(q.host); // returns 'localhost:8080'
console.log(q.pathname); // returns '/#.html'
console.log(q.search); // returns everything after the .html
 
 //http module
 http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello Node!\n');
  }).listen(8080);
  
  console.log('My first Node test server is running on Port 8080.');