"use strict";
var express = require("express");
var conversationRepository = require("../repositories/conversation.repository");
var uuid = require('node-uuid-generator');
var app = express();
function isAuthorizedForConversation(req, res, next) {
    conversationRepository.get(req.params.conversationId || req.body.conversationId)
        .then(function (conversation) {
        var conversationUser = conversation.users.find(function (user) {
            return user.userId.toLowerCase() === req.user.id;
        });
        if (typeof conversationUser === 'undefined' || conversationUser === null) {
            return res.send(403);
        }
        next();
    })
        .catch(function (error) {
        return res.send(500);
    });
}
exports.isAuthorizedForConversation = isAuthorizedForConversation;
;
