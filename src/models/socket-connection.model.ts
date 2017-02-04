import { Document, Schema, Model, model, Types } from "mongoose";
import { ISocketConnection } from '../interfaces/socket-connection.interface';

export interface ISocketConnectionModel extends ISocketConnection, Document {}

export var SocketConnectionSchema: Schema = new Schema({
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

export const SocketConnection: Model<ISocketConnectionModel> = model<ISocketConnectionModel>('SocketConnection', SocketConnectionSchema);
