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
            resolve(toGetResponse(conversation, userId));
            checkAllReadForUser(userId);
        })
            .catch(function (error) {
            reject('Error getting conversation: ' + error);
        });
    });
}
exports.get = get;
function getForCurrentUser(userId, page, pageSize) {
    return new Promise(function (resolve, reject) {
        conversationRepository.getForCurrentUser(userId, page, pageSize)
            .then(function (conversations) {
            var response = conversations.map(function (conversation) {
                return toGetResponse(conversation, userId);
            });
            resolve(response);
        })
            .catch(function (error) {
            reject('Error getting conversation: ' + error);
        });
    });
}
exports.getForCurrentUser = getForCurrentUser;
function getForCurrentUserAndUser(currentUserId, otherUserId) {
    var userIds = [
        otherUserId,
        currentUserId
    ];
    return new Promise(function (resolve, reject) {
        conversationRepository.getForUserIds(userIds)
            .then(function (conversation) {
            resolve(toGetResponse(conversation, currentUserId));
        })
            .catch(function (error) {
            reject('Error getting conversation: ' + error);
        });
    });
}
exports.getForCurrentUserAndUser = getForCurrentUserAndUser;
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
function toGetResponse(conversation, currentUserId) {
    var userIds = conversation.users.map(function (user) {
        return user.userId;
    });
    var otherUserIds = userIds.filter(function (userId) {
        return userId !== currentUserId;
    });
    var response = {
        entity: conversation,
        otherUserIds: otherUserIds
    };
    return response;
}
