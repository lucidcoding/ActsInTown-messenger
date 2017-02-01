import { mongo, Types } from 'mongoose';
import { Message, IMessageModel } from '../models/message.model';
import { IMessage } from '../interfaces/message.interface';
import { Conversation } from '../models/conversation.model';
import { PostMessageRequest } from '../requests/message/post.message.request';
var uuid = require('node-uuid-generator');

export function getForConversation(conversationId: string, page: number, pageSize: number): Promise<IMessage[]> {
    return new Promise((resolve: any, reject: any) => {
        Message
            .find({'conversation':conversationId})
            .sort({addedOn: 'desc'})
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

export function post(request: PostMessageRequest): Promise<any> {
    let now = new Date();

    let message: IMessageModel = new Message({
        _id: uuid.generate(),
        conversation: request.conversationId,
        userId: request.userId,
        addedOn: now,
        deleted: false,
        body: request.body
    });

    return new Promise((resolve: any, reject: any) => {  
        message.save((err: any) => {
            if (err) {
                reject('Error creating message: ' + err);
            } else {
                resolve(<IMessage>message);
            }
        });
    });
}
/*export function start(request: StartConversationRequest): Promise<any> {
    let now = new Date();

    let message = new Message({
        _id: uuid.generate(),
        conversation: request.conversationId,
        userId: request.userId,
        addedOn: now,
        deleted: false,
        body: request.body
    });
    
    return new Promise((resolve: any, reject: any) => {    
        message.post((err: any) => {
            if (err) {
                reject('Error creating message: ' + err);
            } else {
                resolve('Created');
            }
        });
    });
}*/
