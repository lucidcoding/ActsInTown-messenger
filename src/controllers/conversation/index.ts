import express = require('express');
import conversationController = require('./conversation.controller');
import authenticationService = require('../../services/authentication.service');

var routes = express.Router();

routes.get('/test', authenticationService.isAuthenticated(), conversationController.test);
routes.post('/:id', authenticationService.isAuthenticated(), conversationController.start);

export = routes;
