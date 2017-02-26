// import { Message } from '../models/message.model';
// import { Conversation, IConversationModel } from '../models/conversation.model';
import { IConversation } from '../interfaces/conversation.interface';
import { IMessage } from '../interfaces/message.interface';
import { StartConversationRequest } from '../requests/conversation/start.conversation.request';
import { GetConversationResponse } from '../responses/conversation/get.conversation.response';
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
        
                return conversationRepository.save(conversation);
            })
            .then((conversation: IConversation) => {
                resolve(toGetResponse(conversation, userId));
                checkAllReadForUser(userId);
            })
            .catch((error: string) => {
                reject('Error getting conversation: ' + error);
            });
    });
}

export function getForCurrentUser(userId: string, page: number, pageSize: number): Promise<IConversation[]> {
    return new Promise((resolve: any, reject: any) => { 
        conversationRepository.getForCurrentUser(userId, page, pageSize)
            .then((conversations: IConversation[]) => {
                let response = conversations.map((conversation: IConversation) => {
                    return toGetResponse(conversation, userId);
                });

                resolve(response);
            })
            .catch((error: string) => {
                reject('Error getting conversation: ' + error);
            });
    });
}

export function getForCurrentUserAndUser(currentUserId: string, otherUserId: string): Promise<IConversation> {
    let userIds: string[] = [ 
        otherUserId,
        currentUserId
    ];

    return new Promise((resolve: any, reject: any) => { 
        conversationRepository.getForUserIds(userIds)
            .then((conversation: IConversation) => {
                resolve(toGetResponse(conversation, currentUserId));
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
    
    return new Promise((resolve: any, reject: any) => { 
        conversationRepository.save(conversation)
            .then((result: IConversation) => {
                resolve(result);
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

function toGetResponse(conversation: IConversation, currentUserId: string): GetConversationResponse {
    let userIds = conversation.users.map((user: any) => {
        return user.userId;
    });

    let otherUserIds = userIds.filter((userId: string) => {
        return userId !== currentUserId;
    });

    let response = {
        entity: conversation,
        otherUserIds: otherUserIds
    };

    return response;
}