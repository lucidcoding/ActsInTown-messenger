"use strict";
var express = require("express");
var messageController = require("./message.controller");
var authenticationService = require("../../services/authentication.service");
var routes = express.Router();
routes.get('/for-conversation/:conversationId/:page/:pageSize', authenticationService.isAuthenticated(), messageController.getForConversation);
routes.post('', authenticationService.isAuthenticated(), messageController.post);
module.exports = routes;
