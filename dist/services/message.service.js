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
    return new Promise(function (resolve, reject) {
        conversationRepository.get(request.conversationId)
            .then(function (conversation) {
            var now = new Date();
            conversation.updatedOn = now;
            for (var _i = 0, _a = conversation.users; _i < _a.length; _i++) {
                var user = _a[_i];
                if (user.userId.toLowerCase() === request.userId.toLowerCase()) {
                    user.read = true;
                }
                else {
                    user.read = false;
                }
            }
            var message = {
                _id: uuid.generate(),
                conversation: request.conversationId,
                userId: request.userId,
                addedOn: now,
                deleted: false,
                body: request.body
            };
            Promise.all([
                conversationRepository.save(conversation),
                messageRepository.save(message)
            ])
                .then(function (result) {
                /*conversationSaveResult: IConversation = result[0];
                messageSaveResult: IMessage = result[1];
                console.log(conversationSaveResult);
                console.log(messageSaveResult);*/
                var messageSaveResult = result[1];
                resolve(messageSaveResult);
                pushToOtherUsers(messageSaveResult);
            })
                .catch(function (error) {
                reject('Error saving conversation/message/pushing: ' + error);
            });
            /* conversationRepository.save(conversation)
                .then((conversation: IConversation) => {
                    let message: IMessage = {
                        _id: uuid.generate(),
                        conversation: request.conversationId,
                        userId: request.userId,
                        addedOn: now,
                        deleted: false,
                        body: request.body
                    };

                    messageRepository.save(message)
                        .then((result: IMessage) => {
                            pushToOtherUsers(result)
                                .then(() => {
                                    resolve(result);
                                })
                                .catch((error: string) => {
                                    reject('Error pushing to other users: ' + error);
                                });
                        })
                        .catch((error: string) => {
                            reject('Error saving message: ' + error);
                        });
                })
                .catch((error: string) => {
                    reject('Error saving conversation: ' + error);
                });*/
        })
            .catch(function (error) {
            reject('Error getting conversation: ' + error);
        });
    });
}
exports.post = post;
function pushToOtherUsers(message) {
    return new Promise(function (resolve, reject) {
        conversationRepository.get((message.conversation))
            .then(function (conversation) {
            var otherUsers = conversation.users.where(function (user) {
                return user.userId.toLowerCase() !== message.userId.toLowerCase();
            });
            for (var _i = 0, otherUsers_1 = otherUsers; _i < otherUsers_1.length; _i++) {
                var user = otherUsers_1[_i];
                socket_service_1.broadcastTo(user.userId, 'MessageAdded', message);
                socket_service_1.broadcastTo(user.userId, 'UnreadMessage', message);
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
