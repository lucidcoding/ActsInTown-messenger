"use strict";
var mongoose = require('mongoose');
var mongooseConfig = function () {
    // Use Mongoose to connect to MongoDB
    var db = mongoose.connect('mongodb://localhost:27017');
    // Load the application models 
    require('../models/conversation.model');
    require('../models/message.model');
    // Return the Mongoose connection instance
    return db;
};
module.exports = mongooseConfig;
