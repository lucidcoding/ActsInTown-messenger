var mongoose = require('mongoose');
var config = require('/serversettings/actsintown/messenger.config.properties')
// var configFile = required('C:/ServerSettings/ActsInTown/messenger.config.properties');

var mongooseConfig = function() {//(app: any) {
	// Use Mongoose to connect to MongoDB
	//var db = mongoose.connect('mongodb://localhost:27017');
	var db = mongoose.connect(config.dbUrl);

	// Load the application models 
	require('../models/conversation.model');
	require('../models/message.model');

	// Return the Mongoose connection instance
	return db;
};

export = mongooseConfig;
