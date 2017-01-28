import { IConversation } from './conversation.interface';

export interface IMessage {
    _id: any,
    conversation: string | IConversation,
    userId: string;
    addedOn: Date;
    deleted: boolean;
    body: string;
}
