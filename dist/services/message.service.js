"use strict";
var message_model_1 = require("../models/message.model");
var conversation_model_1 = require("../models/conversation.model");
var socket_service_1 = require("./socket.service");
var uuid = require('node-uuid-generator');
Array.prototype.where = function (expression) {
    var matchingElements = [];
    for (var index = 0; index < this.length; index++) {
        var element = this[index];
        if (expression(element)) {
            matchingElements.push(element);
        }
    }
    return matchingElements;
};
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
function post(request) {
    var now = new Date();
    var messageEntity = {
        _id: uuid.generate(),
        conversation: request.conversationId,
        userId: request.userId,
        addedOn: now,
        deleted: false,
        body: request.body
    };
    var message = new message_model_1.Message(messageEntity);
    return new Promise(function (resolve, reject) {
        message.save(function (err) {
            if (err) {
                reject('Error creating message: ' + err);
            }
            else {
                //Send to other user.
                pushToOtherUsers(messageEntity)
                    .then(function () {
                    resolve(message);
                })
                    .catch(function (error) {
                    reject('Error pushing to other users: ' + error);
                });
            }
        });
    });
}
exports.post = post;
function pushToOtherUsers(message) {
    return new Promise(function (resolve, reject) {
        conversation_model_1.Conversation
            .findOne({ '_id': message.conversation })
            .exec(function (error, conversation) {
            if (error) {
                reject('Error getting conversation: ' + error);
            }
            else {
                var otherUserIds = conversation.userIds.where(function (item) {
                    return item.toLowerCase() !== message.userId.toLowerCase();
                });
                for (var _i = 0, otherUserIds_1 = otherUserIds; _i < otherUserIds_1.length; _i++) {
                    var userId = otherUserIds_1[_i];
                    socket_service_1.broadcastTo(userId, 'MessageAdded', message);
                }
                resolve();
            }
        });
    });
}
/*export function start(request: StartConversationRequest): Promise<any> {
    let now = new Date();

    let message = new Message({
        _id: uuid.generate(),
        conversation: request.conversationId,
        userId: request.userId,
        addedOn: now,
        deleted: false,
        body: request.body
    });
    
    return new Promise((resolve: any, reject: any) => {
        message.post((err: any) => {
            if (err) {
                reject('Error creating message: ' + err);
            } else {
                resolve('Created');
            }
        });
    });
}*/
