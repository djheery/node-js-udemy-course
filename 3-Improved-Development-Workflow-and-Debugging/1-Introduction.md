# Debugging and Easier Development

This module will make development and debugging easier improving development efficiency and finding errors. 

## Understanding NPM Scripts

NPM Stands for Node Package Manager, and is installed with NodeJS.
You can use NPM to install 3rd party packages and initialize the project. 

You initialize a project in the terminal with: 

npm init

Then after running through the questions you will have a package.json file. 

The addition of start in the package.json file allows you to start your app a designated entry file for example "app.js"

This would look like this: 

"start": "node app.js"

for custom script names you have to write 

npm run [custom-script-name]

## Installing third party packages 

NPM allows you to install third party packages 

Some example third party packages: 

- Express
- Body Parser 
- GSAP 
- Nodemon 

### Nodemon 

Nodemon is a development dependency rather than a normal thus should should run 

npm i nodemon --save-dev

To utilize nodemone change the package.json start script to as follows: 

{
  ...,
  "start": "nodemon app.js",
  ...,
}

This will look for a local dependency of nodemon and run it. 
If you try to run, nodemon app.js in the terminal it will not work. 
This is because the terminal does not know what nodemon is (unless it is installed globally).

## Fixing Errors

Types of errors: 

- Syntax Errors 
- Runtime Errors 
- Logical Errors 

### Finding and Fixing Syntax Errors

Normally the IDE will help you with these, but you will not be able to run your server if they exist

### Runtime Errors 

Runtime Errors are errors that occur at runtime and will break your code during routes
Check the error messages in the console to debug this. 

## Logical Errors 

These are the most difficult to fix, as it will not cause an error message but will make your app behave in an unexpected manner.
To fix these errors you should use the node js debugger.

