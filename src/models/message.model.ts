import { Document, Schema, Model, model, Types } from "mongoose";
import { IMessage } from '../interfaces/message.interface';

export interface IMessageModel extends IMessage, Document {}

export var MessageSchema: Schema = new Schema({
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

export const Message: Model<IMessageModel> = model<IMessageModel>('Message', MessageSchema);
