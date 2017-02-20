import express = require('express');
import messageController = require('./message.controller');
import authenticationService = require('../../services/authentication.service');
import authorizationService = require('../../services/authorization.service');

var routes = express.Router();

routes.get(
    '/for-conversation/:conversationId/:page/:pageSize',
    authenticationService.isAuthenticated(),
    messageController.getForConversation);

routes.post(
    '',
    authenticationService.isAuthenticated(),
    authorizationService.isAuthorizedForConversation,
    messageController.post);

export = routes;
