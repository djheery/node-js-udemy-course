# Handling Different Routes 

To handle routes with Express you can simply add the route you are wanting as the first param of the use() method: 

``` 
const express = require('express');
const app = express();

app.use('/', (req, res, next) => {
  ....
  res.send('<h1>Home Page</h1>');
})
```

You must order the routes appropriately. 
For example, the above path of '/' will match every request, thus it should be at the end else the homepage will always be called. 

Say we want to add a users page, the structure would look like this: 


``` 
const express = require('express');
const app = express();

app.use('/users', (req, res, next) => {
  ....
  res.send('<h1>Users Page</h1>');
})

app.use('/', (req, res, next) => {
  ....
  res.send('<h1>Home Page</h1>');
})

app.listen(3000);
```

## App.use vs app.get()/ app.post()

app.use() responds to all types of requests
app.get() responds only to GET requests 
app.post() reponds only to POST requests 

This is useful for the different type of endpoints on your site. 

## Routes Folder

You should put your routes into a routes folder. 


