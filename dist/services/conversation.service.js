"use strict";
var conversationRepository = require("../repositories/conversation.repository");
var uuid = require('node-uuid-generator');
function start(request) {
    var now = new Date();
    var userIds = request.usersToIds;
    userIds.push(request.userId);
    var conversation = {
        _id: uuid.generate(),
        startedOn: now,
        deleted: false,
        updatedOn: now,
        userIds: userIds
    };
    /*let message: IMessage = {
        _id: uuid.generate(),
        conversation: request.id,
        userId: request.userId,
        addedOn: now,
        deleted: false,
        body: request.messageBody
    };*/
    return new Promise(function (resolve, reject) {
        conversationRepository.save(conversation)
            .then(function (result) {
            resolve(result);
            /*messageRepository.save(message)
                .then((result: IMessage) => {
                    resolve(result);
                })
                .catch((error: string) => {
                    reject(error);
                });*/
        })
            .catch(function (error) {
            reject(error);
        });
    });
}
exports.start = start;
