import { mongo, Types } from 'mongoose';
import { Message, IMessageModel } from '../models/message.model';
import { IMessage } from '../interfaces/message.interface';
import { Conversation } from '../models/conversation.model';
import { PostMessageRequest } from '../requests/message/post.message.request';
import { broadcastTo } from './socket.service';
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

export function post(request: PostMessageRequest): Promise<any> {
    let now = new Date();

    let messageEntity: IMessage = {
        _id: uuid.generate(),
        conversation: request.conversationId,
        userId: request.userId,
        addedOn: now,
        deleted: false,
        body: request.body
    };

    let message: IMessageModel = new Message(messageEntity);

    return new Promise((resolve: any, reject: any) => {
        message.save((err: any) => {
            if (err) {
                reject('Error creating message: ' + err);
            } else {
                //Send to other user.
                pushToOtherUsers(messageEntity)
                    .then(() => {
                        resolve(<IMessage>message);
                    })
                    .catch((error: string) => {
                        reject('Error pushing to other users: ' + error);
                    });
            }
        });
    });
}

function pushToOtherUsers(message: IMessage): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        Conversation
            .findOne({ '_id': message.conversation })
            .exec((error: any, conversation: any) => {
                if (error) {
                    reject('Error getting conversation: ' + error);
                } else {
                    var otherUserIds = conversation.userIds.where((item: string) => {
                        return item.toLowerCase() !== message.userId.toLowerCase();
                    });

                    for (let userId of otherUserIds) {
                        broadcastTo(userId, 'MessageAdded', message);
                    }

                    resolve();
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
