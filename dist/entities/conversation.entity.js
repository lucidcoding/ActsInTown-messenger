"use strict";
var Conversation = (function () {
    function Conversation() {
    }
    Conversation.start = function (request) {
        var now = new Date();
        var conversation = new Conversation();
        conversation._id = 'test-id';
        conversation.startedOn = now;
        conversation.deleted = false;
        conversation.updatedOn = now;
        conversation.usersToIds = request.usersToIds;
        return conversation;
    };
    return Conversation;
}());
module.exports = Conversation;
