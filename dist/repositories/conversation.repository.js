"use strict";
var conversation_model_1 = require("../models/conversation.model");
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
function getById(conversationId) {
    return new Promise(function (resolve, reject) {
        conversation_model_1.Conversation
            .findOne({ '_id': conversationId })
            .exec(function (error, conversation) {
            if (error) {
                reject('Error getting conversation: ' + error);
            }
            else {
                resolve(conversation);
            }
        });
    });
}
exports.getById = getById;
function save(conversation) {
    var conversationModel = new conversation_model_1.Conversation(conversation);
    return new Promise(function (resolve, reject) {
        conversationModel.save(function (err) {
            if (err) {
                reject('Error creating conversation: ' + err);
            }
            else {
                resolve(conversation);
            }
        });
    });
}
exports.save = save;
