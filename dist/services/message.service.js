"use strict";
var message_model_1 = require("../models/message.model");
var uuid = require('node-uuid-generator');
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
    var message = new message_model_1.Message({
        _id: uuid.generate(),
        conversation: request.conversationId,
        userId: request.userId,
        addedOn: now,
        deleted: false,
        body: request.body
    });
    return new Promise(function (resolve, reject) {
        message.save(function (err) {
            if (err) {
                reject('Error creating message: ' + err);
            }
            else {
                resolve(message);
            }
        });
    });
}
exports.post = post;
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
