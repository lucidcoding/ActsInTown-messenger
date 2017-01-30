"use strict";
var message_model_1 = require("../models/message.model");
var conversation_model_1 = require("../models/conversation.model");
var uuid = require('node-uuid-generator');
function start(request) {
    var now = new Date();
    var userIds = request.usersToIds;
    userIds.push(request.userId);
    var conversation = new conversation_model_1.Conversation({
        _id: request.id,
        startedOn: now,
        deleted: false,
        updatedOn: now,
        usersIds: userIds
    });
    var message = new message_model_1.Message({
        _id: uuid.generate(),
        conversation: request.id,
        userId: request.userId,
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
