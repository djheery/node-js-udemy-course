# Working With Express Introduction 

Express is a third party library is useful for dealing with simple tasks such as extracting body of text, or handling requests, or routing. 

This section will deal with: 

- What is Express.js 
- Using Middleware 
- Working with Requests & Responses (Elegantly)
- Routing 
- Returning HTML Pages 

## What is Express.js?

Express at it's core provides utility functions that help you focus on your business logic rather than focusing of the details of handling requests. 

Responding to requests can be fairly complex, thus express helps us handle them in an elegant way. 
Express is a framework is a set of helper funcmtions, tools & rules that help you build your application and enable you to interact with middle ware. 

Alternative: 

- Vanilla Node.js 
- Adonis.js (Similar to laravel for php)
- Koa.js 
- Sails.js 
- More... 

Express is by far the most popular, and is highly flexible. 

## Installing Express.js 

You install express js with: 

```
npm install --save express 
```

This then allows you to import express with: 

```
const express = require('express');
```

You can then call upon express by attaching it to a variable then enter this as the argument to your start server: 

```
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

server.listen(3000);

```

## MiddleWare

Express is all about middleware.

Middleware means that an incoming request is funnelled through a variety of functions which the requests will go through until the response 
This will allow you to implement a variety of functions/ other packages to deal with the request. 

The call looks like this: 

Request ==> Middlewware ===> Middleware ==> ... ==> Response

This is the core concept

You can call on a middle ware with as such: 

```
const http = require('http');
const express = require('express');

const app = express();
app.use((req, res, next) => {
  console.log('in a middle ware');
  next();
})

app.use((req, res, next) => {
  console.log('in another middle ware');
})

const server = http.createServer(app);

server.listen(3000);

```

The use() method provided by next will define logic for handling requests, it takes in 3 arguments 

- request
- response
- next 

The request and response are similar to before with some added functionality 
The next argument defines the next middle ware to be passed onto after the current middleware is finished 
If there you want to end the request you should respond and thus exit the middleware completley. 

The call stack of the prior will produce the following output: 

'in a middle ware'
'in another middle ware' 

This is because calling next();

will proceed to execute the next middleware.

## How Middleware works

Express js does not send a default response. 

To send a response you can do this: 

```
res.send('<h1>Hello from Express</h1>')
```

The content type from the above response will automatically be set to text/html. 
This is done for you by Express. You can set one manually with: 

res.setHeader('text/html');

## Internals of Express.js

You can navigate to the github repo of express to see what methods does.
If you see the send function you will see how it internally sets the content type and other functions

You will also see that you can call app.listen(3000) instead of creating the server to shorten your code and remove the http import