import { Message, IMessageModel } from '../models/message.model';
import { IMessage } from '../interfaces/message.interface';

export function getForConversation(conversationId: string, page: number, pageSize: number): Promise<IMessage[]> {
    return new Promise((resolve: any, reject: any) => {
        Message
            .find({ 'conversation': conversationId })
            .sort({ addedOn: 'desc' })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .exec((error: any, result: any) => {
                if (error) {
                    reject('Error getting messages: ' + error);
                } else {
                    resolve(result);
                }
            });
    });
}

export function save(message: IMessage): Promise<IMessage> {
    let messageModel: IMessageModel = new Message(message);

    return new Promise((resolve: any, reject: any) => {
        messageModel.save((err: any) => {
            if (err) {
                reject('Error saving message: ' + err);
            } else {
                resolve(<IMessage>message);
            }
        });
    });
}
