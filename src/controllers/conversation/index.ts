import express = require('express');
import conversationController = require('./conversation.controller');

var routes = express.Router();

routes.get('/test', conversationController.test);
routes.post('', conversationController.start);

export = routes;
