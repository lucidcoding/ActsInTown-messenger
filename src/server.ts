import http = require('http');
import express = require('express');
//import path = require('path');
import routes = require('./routes');
import expressConfig = require('./config/express.config');
import mongooseConfig = require('./config/mongoose.config');
//import logService = require('./services/log.service');
//import userService = require('./services/user.service');
import socketService = require('./services/socket.service');

//var db = require('@scadmin/tribo-db');
var db = mongooseConfig();
// Really crap but theres no definition file
//var config = require('config');
var app = express();
//app.set('port', config.get('port') || 3000);
app.set('port', 3010);

expressConfig(app);

routes(app);

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
