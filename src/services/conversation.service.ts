import { mongo, Types } from 'mongoose';
import { Message } from '../models/message.model';
import { Conversation } from '../models/conversation.model';
import { StartConversationRequest } from '../requests/conversation/start.conversation.request';

export function start(request: StartConversationRequest): Promise<any> {
    let now = new Date();
    
    let conversation = new Conversation({
        _id: request.id,
        startedOn: now,
        deleted: false,
        updatedOn: now,
        usersToIds: request.usersToIds    
    });
    
    let message = new Message({
        _id: '28723601-4811-4CF1-97CD-B5FEEFCD0C36',
        conversation: request.id,
        userId: 'me',
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
