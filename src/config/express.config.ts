import express = require('express');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import passport = require('passport');
import helmet = require('helmet');
import compression = require('compression');
import path = require('path');
var multipart = require('connect-multiparty');

var expressConfig = function(app: any) {

	app.use(multipart());
	app.use(helmet());
	app.use(compression());
	app.use(helmet.hsts({
		maxAge: 10886400000,     // Must be at least 18 weeks to be approved by Google 
		includeSubdomains: true, // Must be enabled to be approved by Google 
		preload: true
	}));
	app.use(helmet.noCache({ noEtag: true }));
	app.use(bodyParser({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.use(cookieParser());
	app.use(passport.initialize());
	app.all('*', (req: any, res: any, next: any) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With');
		res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
		next();
	});
};

export = expressConfig;









/*/import config = require('./config');
import express = require('express');
import http = require('http');
import socketio = require('socket.io');
//import morgan = require('morgan');
//import compress = require('compression');
//import bodyParser = require('body-parser');
//import methodOverride = require('method-override');
//import session = require('express-session');
//import MongoStore = require('connect-mongo')(session);
//import flash = require('connect-flash');
//import passport = require('passport');

// Define the Express configuration method
var configure = function(db:any) {
//module.exports = function(db) {
	// Create a new Express application instance
	var app = express();

	// Create a new HTTP server
    var server = http.createServer(app);

    // Create a new Socket.io server
    var io = socketio.listen(server);

	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	/// Configure the MongoDB session storage
	var mongoStore = new MongoStore({
        db: db.connection.db
    });

	// Configure the 'session' middleware
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: mongoStore
	}));

	// Set the application view engine and 'views' folder
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// Configure the flash messages middleware
	app.use(flash());

	// Configure the Passport middleware
	app.use(passport.initialize());
	app.use(passport.session());

	// Load the routing files
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/articles.server.routes.js')(app);

	// Configure static file serving
	app.use(express.static('./public'));

	// Load the Socket.io configuration
	require('./socketio')(server, io, mongoStore);
	
	// Return the Server instance
	return server;
};

export = configure;*/
