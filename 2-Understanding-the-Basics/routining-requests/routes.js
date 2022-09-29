const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if(url === '/') {

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter Text</title></head>');
    res.write('<body><h1>Enter Form</h1></body>')
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
    res.write('</html>');
    return res.end();
  
  } else if (url === '/message' && method === 'POST') {
    // req.on() is an Async function thus will be run the action in the callback is completed 
    // It adds a new event listener internally and then call that function for you when it is done parsing the relevant request.
    // It will not pause the main function until that is done.
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
  
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      // writeFileSync will block execution of the next code until this is done. This is only okay 
      // for very small files.
      // fs.writeFileSync('message.txt', message);
      // This will execute when done writing the file.
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    })
  
  
  }
  
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My Server</title></head>');
  res.write('<body><h1>My Server</h1></body>')
  res.write('</html>');
  res.end();
}

module.exports = requestHandler;