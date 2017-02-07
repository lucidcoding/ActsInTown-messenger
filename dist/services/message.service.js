"use strict";
var socket_service_1 = require("./socket.service");
var conversationRepository = require("../repositories/conversation.repository");
var messageRepository = require("../repositories/message.repository");
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
function post(request) {
    var now = new Date();
    var message = {
        _id: uuid.generate(),
        conversation: request.conversationId,
        userId: request.userId,
        addedOn: now,
        deleted: false,
        body: request.body
    };
    return new Promise(function (resolve, reject) {
        messageRepository.save(message)
            .then(function (result) {
            pushToOtherUsers(result)
                .then(function () {
                resolve(result);
            })
                .catch(function (error) {
                reject('Error pushing to other users: ' + error);
            });
        })
            .catch(function (error) {
            reject(error);
        });
    });
}
exports.post = post;
function pushToOtherUsers(message) {
    return new Promise(function (resolve, reject) {
        conversationRepository.getById((message.conversation))
            .then(function (conversation) {
            var otherUserIds = conversation.userIds.where(function (item) {
                return item.toLowerCase() !== message.userId.toLowerCase();
            });
            for (var _i = 0, otherUserIds_1 = otherUserIds; _i < otherUserIds_1.length; _i++) {
                var userId = otherUserIds_1[_i];
                socket_service_1.broadcastTo(userId, 'MessageAdded', message);
            }
            resolve();
        })
            .catch(function (error) {
            reject(error);
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
