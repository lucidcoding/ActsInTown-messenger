"use strict";
var conversationService = require("../../services/conversation.service");
function get(req, res) {
    conversationService.get(req.params.conversationId, req.user.id)
        .then(function (result) {
        res.status(200).json(result);
    })
        .catch(function (error) {
        res.status(500).json({ error: error });
    });
}
exports.get = get;
function getForCurrentUser(req, res) {
    conversationService.getForCurrentUser(req.user.id, req.params.page, req.params.pageSize)
        .then(function (result) {
        res.status(200).json(result);
    })
        .catch(function (error) {
        res.status(500).json({ error: error });
    });
}
exports.getForCurrentUser = getForCurrentUser;
function getForCurrentUserAndUser(req, res) {
    conversationService.getForCurrentUserAndUser(req.user.id, req.params.userId)
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
        userId: req.user.id,
        usersToIds: req.body.usersToIds
    };
    conversationService.start(request)
        .then(function (result) {
        res.status(201).json(result);
    })
        .catch(function (error) {
        res.status(500).json({ error: error });
    });
}
exports.start = start;
