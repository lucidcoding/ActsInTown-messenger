import http = require('http');
import express = require('express');
//import path = require('path');
//import routes = require('./routes');
import expressConfig = require('./config/express');
//import logService = require('./services/log.service');
//import userService = require('./services/user.service');
import socketService = require('./services/socket.service');

//var db = require('@scadmin/tribo-db');

// Really crap but theres no definition file
//var config = require('config');
var app = express();
//app.set('port', config.get('port') || 3000);
app.set('port', 3000);

expressConfig(app);

//routes(app);

//catch 404 and forward to error handler
/*app.use((req, res, next) => {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
});*/


/*logService.log(`Attempting to listen on ${app.get('port')}`);
var server = http.createServer(app);
server.listen(app.get('port'), function(){
  logService.log(`Express server listening on port ${app.get('port')}`);
});*/
var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log(`Express server listening on port ${app.get('port')}`);
});

// Bind to the http server and make a connection for socket communication
socketService.listen(server);






/*import express = require('express');
import http = require('http');
import socketIo = require('socket.io');


var app = express();
var server = http.createServer(app);
var io = socketIo(server);

io.on('connection', (socket: any) => {
    console.log('connection!');
});

server.listen(3000);*/

/*
// Set the 'NODE_ENV' variable
//process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
//import mongoose = require('./config/mongoose');
import express = require('./config/express');
//import passport = require('./config/passport');

// Create a new Mongoose connection instance
//var db = mongoose();

// Create a new Express application instance
//var app = express(db);
var app = express({});

// Configure the Passport middleware
//var passport = passport();

// Use the Express application instance to listen to the '3000' port
app.listen(3000);

// Log the server status to the console
console.log('Server running at http://localhost:3000/');

// Use the module.exports property to expose our Express application instance for external usage
//export = app;
*/