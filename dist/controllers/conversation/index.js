"use strict";
var express = require("express");
var conversationController = require("./conversation.controller");
var authenticationService = require("../../services/authentication.service");
var routes = express.Router();
routes.get('/for-current-user/:page/:pageSize', authenticationService.isAuthenticated(), conversationController.getForCurrentUser);
routes.get('/for-current-user-and-user/:userId', authenticationService.isAuthenticated(), conversationController.getForCurrentUserAndUser);
routes.post('', authenticationService.isAuthenticated(), conversationController.start);
module.exports = routes;
