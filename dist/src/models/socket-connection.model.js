"use strict";
var mongoose_1 = require("mongoose");
exports.SocketConnectionSchema = new mongoose_1.Schema({
    _id: {
        type: String
    },
    userId: {
        type: String
    },
    socketId: {
        type: String
    },
    addedOn: {
        type: Date
    },
    deleted: {
        type: Boolean
    }
});
exports.SocketConnection = mongoose_1.model('SocketConnection', exports.SocketConnectionSchema);
