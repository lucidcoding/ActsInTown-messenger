"use strict";
var mongoose_1 = require("mongoose");
exports.MessageSchema = new mongoose_1.Schema({
    _id: {
        type: String
    },
    conversation: {
        type: String, ref: 'Conversation'
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
exports.Message = mongoose_1.model('Message', exports.MessageSchema);
