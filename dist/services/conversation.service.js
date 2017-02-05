"use strict";
var message_model_1 = require("../models/message.model");
var conversation_model_1 = require("../models/conversation.model");
var uuid = require('node-uuid-generator');
function getForCurrentUser(currentUserId, page, pageSize) {
    return new Promise(function (resolve, reject) {
        conversation_model_1.Conversation
            .find({ 'userIds': currentUserId })
            .sort({ updatedOn: 'desc' })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .exec(function (error, result) {
            if (error) {
                reject('Error getting conversations: ' + error);
            }
            else {
                resolve(result);
            }
        });
    });
}
exports.getForCurrentUser = getForCurrentUser;
function start(request) {
    var now = new Date();
    var userIds = request.usersToIds;
    userIds.push(request.userId);
    var conversation = new conversation_model_1.Conversation({
        _id: request.id,
        startedOn: now,
        deleted: false,
        updatedOn: now,
        userIds: userIds
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
