"use strict";
var conversationRepository = require("../repositories/conversation.repository");
var messageRepository = require("../repositories/message.repository");
var uuid = require('node-uuid-generator');
function start(request) {
    var now = new Date();
    var userIds = request.usersToIds;
    userIds.push(request.userId);
    var conversation = {
        _id: request.id,
        startedOn: now,
        deleted: false,
        updatedOn: now,
        userIds: userIds
    };
    var message = {
        _id: uuid.generate(),
        conversation: request.id,
        userId: request.userId,
        addedOn: now,
        deleted: false,
        body: request.messageBody
    };
    return new Promise(function (resolve, reject) {
        conversationRepository.save(conversation)
            .then(function (result) {
            messageRepository.save(message)
                .then(function (result) {
                resolve(result);
            })
                .catch(function (error) {
                reject(error);
            });
        })
            .catch(function (error) {
            reject(error);
        });
    });
}
exports.start = start;
