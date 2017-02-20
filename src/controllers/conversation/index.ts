import express = require('express');
import conversationController = require('./conversation.controller');
import authenticationService = require('../../services/authentication.service');
import authorizationService = require('../../services/authorization.service');

var routes = express.Router();

routes.get(
        '/:conversationId',
        authenticationService.isAuthenticated(),
        authorizationService.isAuthorizedForConversation,
        conversationController.get);

routes.get(
    '/for-current-user/:page/:pageSize',
    authenticationService.isAuthenticated(),
    conversationController.getForCurrentUser);

routes.get(
    '/for-current-user-and-user/:userId',
    authenticationService.isAuthenticated(),
    conversationController.getForCurrentUserAndUser);

routes.post(
    '',
    authenticationService.isAuthenticated(),
    conversationController.start);

export = routes;
