"use strict";
var Conversation = require("../../entities/conversation.entity");
var ConversationModel = require("../../models/conversation.model");
function test(req, res) {
    res.status(200).json({ val: 'ok' });
}
exports.test = test;
function start(req, res) {
    console.log('start');
    var request = {
        usersToIds: req.body.usersToIds,
        messageBody: req.body.messageBody
    };
    var conversation = Conversation.start(request);
    var conversationModel = new ConversationModel(conversation);
    conversationModel.save(function (err) {
        if (err) {
            res.status(500).json({ val: err });
        }
        else {
            res.status(201).json({ val: 'ok' });
        }
    });
}
exports.start = start;
