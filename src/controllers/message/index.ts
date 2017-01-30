import express = require('express');
import messageController = require('./message.controller');
import authenticationService = require('../../services/authentication.service');

var routes = express.Router();

routes.get('/for-conversation/:conversationId', authenticationService.isAuthenticated(), messageController.getForConversation);
routes.post('', authenticationService.isAuthenticated(), messageController.post);

export = routes;
