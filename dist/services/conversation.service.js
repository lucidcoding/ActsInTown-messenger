"use strict";
var conversationRepository = require("../repositories/conversation.repository");
var uuid = require('node-uuid-generator');
var socket_service_1 = require("./socket.service");
function get(conversationId, userId) {
    return new Promise(function (resolve, reject) {
        conversationRepository.get(conversationId)
            .then(function (conversation) {
            var conversationUser = conversation.users.find(function (user) {
                return user.userId.toLowerCase() === userId.toLowerCase();
            });
            conversationUser.read = true;
            return conversationRepository.save(conversation);
        })
            .then(function (conversation) {
            resolve(conversation);
            checkAllReadForUser(userId);
        })
            .catch(function (error) {
            reject('Error getting conversation: ' + error);
        });
    });
}
exports.get = get;
function start(request) {
    var now = new Date();
    var userIds = request.usersToIds;
    userIds.push(request.userId);
    var conversation = {
        _id: uuid.generate(),
        startedOn: now,
        deleted: false,
        updatedOn: now,
        users: userIds.map(function (userId) {
            return {
                userId: userId,
                read: false
            };
        })
    };
    return new Promise(function (resolve, reject) {
        conversationRepository.save(conversation)
            .then(function (result) {
            resolve(result);
        })
            .catch(function (error) {
            reject(error);
        });
    });
}
exports.start = start;
function checkAllReadForUser(userId) {
    conversationRepository.getUnreadForUser(userId)
        .then(function (result) {
        if (result.length === 0) {
            socket_service_1.broadcastTo(userId, 'AllMessageRead', null);
        }
    })
        .catch(function (error) {
        //reject(error);
    });
}
