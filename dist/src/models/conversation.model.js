"use strict";
var mongoose_1 = require("mongoose");
exports.ConversationSchema = new mongoose_1.Schema({
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
exports.Conversation = mongoose_1.model('Conversation', exports.ConversationSchema);
