"use strict";
var message_model_1 = require("../models/message.model");
function getForConversation(conversationId, page, pageSize) {
    return new Promise(function (resolve, reject) {
        message_model_1.Message
            .find({ 'conversation': conversationId })
            .sort({ addedOn: 'desc' })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .exec(function (error, result) {
            if (error) {
                reject('Error getting messages: ' + error);
            }
            else {
                resolve(result);
            }
        });
    });
}
exports.getForConversation = getForConversation;
function save(message) {
    var messageModel = new message_model_1.Message(message);
    return new Promise(function (resolve, reject) {
        messageModel.save(function (err) {
            if (err) {
                reject('Error saving message: ' + err);
            }
            else {
                resolve(message);
            }
        });
    });
}
exports.save = save;
