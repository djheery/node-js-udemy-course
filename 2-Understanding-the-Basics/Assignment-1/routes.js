const requestHandler = (req, res) => {
  const method = req.method;
  const url = req.url;
  const body = req.body;
  if(url === '/') {
    res.write('<html>');
    res.write('<head><title>My Assignment 1</title></head>');
    res.write('<body><h1>Enter New User</h1><form action="/users" method="POST"><input type="text" name="user-name" id="user-name"></body>');
    res.write('</html>');
    return res.end();
  }

  if(url === '/users') {
    res.write('<html>');
    res.write('<head><title>Users</title></head>');
    res.write(`
      <body>
        <h1>users</h1>
        <ul>
          <li>User 1</li>
          <li>User 2</li>
        </ul>
      </body>
    `);
    res.write('</html>');
    if(method === 'POST') {
      const body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      });
      return req.on('end', () => {
        const username = Buffer.concat(body).toString();
        const username2 = username.split('=')[1];
        console.log(username2);
        return res.end()
      })
    }
    return res.end();
  } 

  res.write('<html>');
  res.write('<head><title>My Assignment 1</title></head>');
  res.write('<body><h1>My Assignment 1</h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = requestHandler