"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conversationSchema = new Schema({
    _id: {
        type: String
    },
    startedOn: {
        type: Date
    },
    deleted: {
        type: Boolean
    },
    updatedOn: {
        type: Date
    },
    userIds: [String]
});
var ConversationModel = mongoose.model('ConversationModel', conversationSchema);
module.exports = ConversationModel;
