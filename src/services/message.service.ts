import { IMessage } from '../interfaces/message.interface';
import { IConversation } from '../interfaces/conversation.interface';
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

export function post(request: PostMessageRequest): Promise<IMessage> {
    return new Promise((resolve: any, reject: any) => {
        conversationRepository.get(request.conversationId)
            .then((conversation: IConversation) => {
                let now = new Date();
                conversation.updatedOn = now;

                for (var user of conversation.users) {
                    if (user.userId.toLowerCase() === request.userId.toLowerCase()) {
                        user.read = true;
                    } else {
                        user.read = false;
                    }
                }

                let message: IMessage = {
                    _id: uuid.generate(),
                    conversation: request.conversationId,
                    userId: request.userId,
                    addedOn: now,
                    deleted: false,
                    body: request.body
                };

                Promise.all([
                    conversationRepository.save(conversation),
                    messageRepository.save(message)
                ])
                    .then((result: any[]) => { 
                        /*conversationSaveResult: IConversation = result[0];
                        messageSaveResult: IMessage = result[1];
                        console.log(conversationSaveResult);
                        console.log(messageSaveResult);*/
                        let messageSaveResult: IMessage = result[1];
                        resolve(messageSaveResult);
                        pushToOtherUsers(messageSaveResult);
                    })
                    .catch((error: string) => {
                        reject('Error saving conversation/message/pushing: ' + error);
                    });
                /* conversationRepository.save(conversation)
                    .then((conversation: IConversation) => {
                        let message: IMessage = {
                            _id: uuid.generate(),
                            conversation: request.conversationId,
                            userId: request.userId,
                            addedOn: now,
                            deleted: false,
                            body: request.body
                        };

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
                                reject('Error saving message: ' + error);
                            });
                    })
                    .catch((error: string) => {
                        reject('Error saving conversation: ' + error);
                    });*/
            })
            .catch((error: string) => {
                reject('Error getting conversation: ' + error);
            });
    });
}

function pushToOtherUsers(message: IMessage): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        conversationRepository.get(<string>(message.conversation))
            .then((conversation: IConversation) => {
                var otherUsers: any[] = conversation.users.where((user: any) => {
                    return user.userId.toLowerCase() !== message.userId.toLowerCase();
                });

                for (let user of otherUsers) {
                    broadcastTo(user.userId, 'MessageAdded', message);
                    broadcastTo(user.userId, 'UnreadMessage', message);
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
