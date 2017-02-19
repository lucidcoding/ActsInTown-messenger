import { Document, Schema, Model, model, Types } from "mongoose";
import { IConversation } from '../interfaces/conversation.interface';

export interface IConversationModel extends IConversation, Document {}

export var ConversationSchema: Schema = new Schema({
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
    users: [{
        userId: {
            type: String
        },
        read: {
            type: Boolean
        }
    }]
});

export const Conversation: Model<IConversationModel> = model<IConversationModel>('Conversation', ConversationSchema);
