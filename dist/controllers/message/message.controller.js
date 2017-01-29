"use strict";
var messageService = require("../../services/message.service");
function getForConversation(req, res) {
    messageService.getForConversation(req.params.conversationId)
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
    res.status(201).json({ result: 'ok' });
    /*messageService.post(request)
        .then((result: string) => {
            res.status(201).json({ result: result });
        })
        .catch((error: string) => {
            res.status(500).json({ error: error });
        });*/
}
exports.post = post;
