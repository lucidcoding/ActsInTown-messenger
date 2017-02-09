import express = require('express');
import conversationController = require('./conversation.controller');
import authenticationService = require('../../services/authentication.service');

var routes = express.Router();

routes.get('/for-current-user/:page/:pageSize', authenticationService.isAuthenticated(), conversationController.getForCurrentUser);
routes.get('/for-current-user-and-user/:userId', authenticationService.isAuthenticated(), conversationController.getForCurrentUserAndUser);
routes.post('', authenticationService.isAuthenticated(), conversationController.start);

export = routes;
