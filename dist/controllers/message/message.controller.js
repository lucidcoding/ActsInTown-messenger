"use strict";
var messageService = require("../../services/message.service");
var messageRepository = require("../../repositories/message.repository");
function getForConversation(req, res) {
    messageRepository.getForConversation(req.params.conversationId, req.params.page, req.params.pageSize)
        .then(function (result) {
        res.status(200).json(result);
    })
        .catch(function (error) {
        res.status(500).json({ error: error });
    });
}
exports.getForConversation = getForConversation;
function post(req, res) {
    var request = {
        userId: req.user.id,
        conversationId: req.body.conversationId,
        body: req.body.body
    };
    messageService.post(request)
        .then(function (result) {
        res.status(201).json(result);
    })
        .catch(function (error) {
        res.status(500).json({ error: error });
    });
}
exports.post = post;
