// import { Message } from '../models/message.model';
// import { Conversation, IConversationModel } from '../models/conversation.model';
import { IConversation } from '../interfaces/conversation.interface';
import { IMessage } from '../interfaces/message.interface';
import { StartConversationRequest } from '../requests/conversation/start.conversation.request';
import conversationRepository = require('../repositories/conversation.repository');
import messageRepository = require('../repositories/message.repository');
var uuid = require('node-uuid-generator');
import { broadcastTo } from './socket.service';

export function get(conversationId: string, userId: string): Promise<IConversation> {
    return new Promise((resolve: any, reject: any) => { 
        conversationRepository.get(conversationId)
            .then((conversation: IConversation) => {
                let conversationUser: any = conversation.users.find((user: any) => {
                    return user.userId.toLowerCase() === userId.toLowerCase();
                });

                conversationUser.read = true;
        
                conversationRepository.save(conversation)
                    .then((conversation: IConversation) => {
                        resolve(conversation);
                        checkAllReadForUser(userId);
                    })
                    .catch((error: string) => {
                        reject('Error marking conversation as unread: ' + error);
                    });
            })
            .catch((error: string) => {
                reject('Error getting conversation: ' + error);
            });
    });
}

export function start(request: StartConversationRequest): Promise<any> {
    let now = new Date();

    let userIds = request.usersToIds;
    userIds.push(request.userId);

    let conversation: IConversation = {
        _id: uuid.generate(),
        startedOn: now,
        deleted: false,
        updatedOn: now,
        users: userIds.map((userId: string) => {
            return {
                userId: userId,
                read: false
            };
        })   
    };
    
    /*let message: IMessage = {
        _id: uuid.generate(),
        conversation: request.id,
        userId: request.userId,
        addedOn: now,
        deleted: false,
        body: request.messageBody
    };*/
    
    return new Promise((resolve: any, reject: any) => { 
        conversationRepository.save(conversation)
            .then((result: IConversation) => {
                resolve(result);
                /*messageRepository.save(message)
                    .then((result: IMessage) => {
                        resolve(result);
                    })
                    .catch((error: string) => {
                        reject(error);
                    });*/
            })
            .catch((error: string) => {
                reject(error);
            });
    });
}

function checkAllReadForUser(userId: string) {
    conversationRepository.getUnreadForUser(userId)
        .then((result: IConversation[]) => {
                if (result.length === 0) {
                    broadcastTo(userId, 'AllMessageRead', null);
                }
            })
            .catch((error: string) => {
                //reject(error);
            });
}
