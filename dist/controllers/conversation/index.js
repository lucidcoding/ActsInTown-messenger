"use strict";
var express = require("express");
var conversationController = require("./conversation.controller");
var authenticationService = require("../../services/authentication.service");
var routes = express.Router();
routes.get('/test', authenticationService.isAuthenticated(), conversationController.test);
routes.get('/for-current-user/:page/:pageSize', authenticationService.isAuthenticated(), conversationController.getForCurrentUser);
routes.post('/:id', authenticationService.isAuthenticated(), conversationController.start);
module.exports = routes;
