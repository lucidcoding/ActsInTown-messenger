"use strict";
var message_model_1 = require("../models/message.model");
var conversation_model_1 = require("../models/conversation.model");
function start(request) {
    var now = new Date();
    var conversation = new conversation_model_1.Conversation({
        _id: request.id,
        startedOn: now,
        deleted: false,
        updatedOn: now,
        usersToIds: request.usersToIds
    });
    var message = new message_model_1.Message({
        _id: '28723601-4811-4CF1-97CD-B5FEEFCD0C36',
        conversation: request.id,
        userId: 'me',
        addedOn: now,
        deleted: false,
        body: request.messageBody
    });
    return new Promise(function (resolve, reject) {
        conversation.save(function (err) {
            if (err) {
                reject('Error creating conversation: ' + err);
            }
            else {
                message.save(function (err) {
                    if (err) {
                        reject('Error creating message: ' + err);
                    }
                    else {
                        resolve('Created');
                    }
                });
            }
        });
    });
}
exports.start = start;
