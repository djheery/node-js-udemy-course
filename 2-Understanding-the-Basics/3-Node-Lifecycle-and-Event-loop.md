# The Node Lifecycle and the Event Loop 

General process: 

node app.js ===>
    start script ===> 
        parse code, register variables/ functions ===> 
            event loop 

The event loop keeps running as long as there are events to be listend for.
The core node application is managed by the event loop. 

The entire event loop runs on one thread and executes when an even occurs. 

process.exit() 

will end the event loop. 

Typically you will not call this function. 

