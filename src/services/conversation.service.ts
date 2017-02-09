// import { Message } from '../models/message.model';
// import { Conversation, IConversationModel } from '../models/conversation.model';
import { IConversation } from '../interfaces/conversation.interface';
import { IMessage } from '../interfaces/message.interface';
import { StartConversationRequest } from '../requests/conversation/start.conversation.request';
import conversationRepository = require('../repositories/conversation.repository');
import messageRepository = require('../repositories/message.repository');
var uuid = require('node-uuid-generator');

export function start(request: StartConversationRequest): Promise<any> {
    let now = new Date();

    let userIds = request.usersToIds;
    userIds.push(request.userId);

    let conversation: IConversation = {
        _id: uuid.generate(),
        startedOn: now,
        deleted: false,
        updatedOn: now,
        userIds: userIds    
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
