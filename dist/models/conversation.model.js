"use strict";
var mongoose_1 = require("mongoose");
exports.ConversationSchema = new mongoose_1.Schema({
    _id: {
        //type: Types.ObjectId
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
//http://stackoverflow.com/questions/34482136/mongoose-the-typescript-way
//https://gist.github.com/masahirompp/3c012c8721b70821fa45
//https://github.com/Appsilon/styleguide/wiki/mongoose-typescript-models
//https://gist.github.com/brennanMKE/ee8ea002d305d4539ef6
//http://stackoverflow.com/questions/29664499/mongoose-static-methods-vs-instance-methods
//http://stackoverflow.com/questions/19720043/node-js-mongoose-static-method-example
//https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
//http://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/
