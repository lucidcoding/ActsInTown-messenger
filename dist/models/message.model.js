"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = new Schema({
    _id: {
        type: String
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Conversation'
    },
    userId: {
        type: String
    },
    addedOn: {
        type: Date
    },
    deleted: {
        type: Boolean
    },
    body: {
        type: String
    },
});
var MessageModel = mongoose.model('MessageModel', messageSchema);
module.exports = MessageModel;
