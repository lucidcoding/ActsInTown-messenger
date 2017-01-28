import { Document, Schema, Model, model, Types } from "mongoose";
import { IConversation } from '../interfaces/conversation.interface';

export interface IConversationModel extends IConversation, Document {}

export var ConversationSchema: Schema = new Schema({
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

export const Conversation: Model<IConversationModel> = model<IConversationModel>('Conversation', ConversationSchema);

//http://stackoverflow.com/questions/34482136/mongoose-the-typescript-way
//https://gist.github.com/masahirompp/3c012c8721b70821fa45
//https://github.com/Appsilon/styleguide/wiki/mongoose-typescript-models
//https://gist.github.com/brennanMKE/ee8ea002d305d4539ef6
//http://stackoverflow.com/questions/29664499/mongoose-static-methods-vs-instance-methods
//http://stackoverflow.com/questions/19720043/node-js-mongoose-static-method-example
//https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
//http://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/
