"use strict";
var express = require("express");
var conversationController = require("./conversation.controller");
var routes = express.Router();
routes.get('/test', conversationController.test);
routes.post('', conversationController.start);
module.exports = routes;
