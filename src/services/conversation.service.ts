import { mongo, Types } from 'mongoose';
import { Message } from '../models/message.model';
import { Conversation, IConversationModel } from '../models/conversation.model';
import { StartConversationRequest } from '../requests/conversation/start.conversation.request';
var uuid = require('node-uuid-generator');

export function start(request: StartConversationRequest): Promise<any> {
    let now = new Date();

    let userIds = request.usersToIds;
    userIds.push(request.userId);

    let conversation: IConversationModel = new Conversation({
        _id: request.id,
        startedOn: now,
        deleted: false,
        updatedOn: now,
        usersIds: userIds    
    });
    
    let message = new Message({
        _id: uuid.generate(),
        conversation: request.id,
        userId: request.userId,
        addedOn: now,
        deleted: false,
        body: request.messageBody
    });
    
    return new Promise((resolve: any, reject: any) => {    
        conversation.save((err: any) => {
            if (err) {
                reject('Error creating conversation: ' + err);
            } else {
                message.save((err: any) => {
                    if (err) {
                        reject('Error creating message: ' + err);
                    } else {
                        resolve('Created');
                    }
                });
            }
        });
    });
}
