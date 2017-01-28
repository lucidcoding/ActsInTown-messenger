"use strict";
var message_model_1 = require("../../models/message.model");
var conversationService = require("../../services/conversation.service");
function test(req, res) {
    var message = message_model_1.Message
        .findOne({ '_id': '28723601-4811-4CF1-97CD-B5FEEFCD0C36' })
        .populate('conversation')
        .exec(function (error, result) {
        res.status(200).json(message);
    });
}
exports.test = test;
function start(req, res) {
    console.log('start');
    var request = {
        id: req.params.id,
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
