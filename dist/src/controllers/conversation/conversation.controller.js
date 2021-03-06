"use strict";
var conversationService = require("../../services/conversation.service");
var conversationRepository = require("../../repositories/conversation.repository");
function getForCurrentUser(req, res) {
    conversationRepository.getForCurrentUser(req.user.id, req.params.page, req.params.pageSize)
        .then(function (result) {
        res.status(200).json(result);
    })
        .catch(function (error) {
        res.status(500).json({ error: error });
    });
}
exports.getForCurrentUser = getForCurrentUser;
function getForCurrentUserAndUser(req, res) {
    var userIds = [
        req.params.userId,
        req.user.id
    ];
    conversationRepository.getForUserIds(userIds)
        .then(function (result) {
        res.status(200).json(result);
    })
        .catch(function (error) {
        res.status(500).json({ error: error });
    });
}
exports.getForCurrentUserAndUser = getForCurrentUserAndUser;
function start(req, res) {
    var request = {
        id: req.params.id,
        userId: req.user.id,
        usersToIds: req.body.usersToIds,
        messageBody: req.body.messageBody
    };
    conversationService.start(request)
        .then(function (result) {
        res.status(201).json({ result: result });
    })
        .catch(function (error) {
        res.status(500).json({ error: error });
    });
}
exports.start = start;
