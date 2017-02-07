import { Conversation, IConversationModel } from '../models/conversation.model';
import { IConversation } from '../interfaces/conversation.interface';

export function getForCurrentUser(currentUserId: string, page: number, pageSize: number): Promise<IConversation[]> {
    return new Promise((resolve: any, reject: any) => {
        Conversation
            .find({ 'userIds': currentUserId })
            .sort({ updatedOn: 'desc' })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .exec((error: any, result: any) => {
                if (error) {
                    reject('Error getting conversations: ' + error);
                } else {
                    resolve(result);
                }
            });
    });
}

export function getById(conversationId: string): Promise<IConversation> {
    return new Promise((resolve: any, reject: any) => {
        Conversation
            .findOne({ '_id': conversationId })
            .exec((error: any, conversation: any) => {
                if (error) {
                    reject('Error getting conversation: ' + error);
                } else {
                    resolve(conversation);
                }
            });
    });
}

export function save(conversation: IConversation): Promise<IConversation> {
    let conversationModel: IConversationModel = new Conversation(conversation);

    return new Promise((resolve: any, reject: any) => {    
        conversationModel.save((err: any) => {
            if (err) {
                reject('Error creating conversation: ' + err);
            } else {
                resolve(conversation);
            }
        });
    });
}
