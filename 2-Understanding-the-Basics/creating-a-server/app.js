const http = require('http');

// Create server takes a callback, this can either be an anonymous function or a pointer to a readily made function
// The create server returns a server, thus it must be stored in a variable 
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.write("<html>");
  res.write("<head><title>My Server</title></head>");
  res.write("<body><h1>My Server</h1></body>")
  res.write("</html>");
  res.end();
});

// This starts the server in the port 
// Arguments: [port, ...other args]
server.listen(3000)