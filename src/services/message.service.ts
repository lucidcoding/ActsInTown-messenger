//import { mongo, Types } from 'mongoose';
//import { Message, IMessageModel } from '../models/message.model';
import { IMessage } from '../interfaces/message.interface';
import { IConversation } from '../interfaces/conversation.interface';
//import { Conversation } from '../models/conversation.model';
import { PostMessageRequest } from '../requests/message/post.message.request';
import { broadcastTo } from './socket.service';
import conversationRepository = require('../repositories/conversation.repository');
import messageRepository = require('../repositories/message.repository');
var uuid = require('node-uuid-generator');

Array.prototype.where = function (expression: Function) {
	var matchingElements = [];

	for (var index: number = 0; index < this.length; index++) {
		var element = this[index];

		if (expression(element)) {
			matchingElements.push(element);
		}
	}

	return matchingElements;
};

export function post(request: PostMessageRequest): Promise<any> {
    let now = new Date();

    let message: IMessage = {
        _id: uuid.generate(),
        conversation: request.conversationId,
        userId: request.userId,
        addedOn: now,
        deleted: false,
        body: request.body
    };

    return new Promise((resolve: any, reject: any) => {
        messageRepository.save(message)
            .then((result: IMessage) => {
                pushToOtherUsers(result)
                    .then(() => {
                        resolve(result);
                    })
                    .catch((error: string) => {
                        reject('Error pushing to other users: ' + error);
                    });
            })
            .catch((error: string) => {
                reject(error);
            });
    });
}

function pushToOtherUsers(message: IMessage): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        conversationRepository.getById(<string>(message.conversation))
            .then((conversation: IConversation) => {
                var otherUserIds = conversation.userIds.where((item: string) => {
                    return item.toLowerCase() !== message.userId.toLowerCase();
                });

                for (let userId of otherUserIds) {
                    broadcastTo(userId, 'MessageAdded', message);
                }

                resolve();
            })
            .catch((error: string) => {
                reject(error);
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
