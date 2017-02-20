"use strict";
var express = require("express");
var messageController = require("./message.controller");
var authenticationService = require("../../services/authentication.service");
var authorizationService = require("../../services/authorization.service");
var routes = express.Router();
routes.get('/for-conversation/:conversationId/:page/:pageSize', authenticationService.isAuthenticated(), messageController.getForConversation);
routes.post('', authenticationService.isAuthenticated(), authorizationService.isAuthorizedForConversation, messageController.post);
module.exports = routes;
