import { Conversation, IConversationModel } from '../models/conversation.model';
import { IConversation } from '../interfaces/conversation.interface';

export function get(conversationId: string): Promise<IConversation> {
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

export function getForCurrentUser(currentUserId: string, page: number, pageSize: number): Promise<IConversation[]> {
    return new Promise((resolve: any, reject: any) => {
        Conversation
            .find({ 'users.userId': currentUserId })
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

export function getForUserIds(userIds: string[]): Promise<IConversation> {
    return new Promise((resolve: any, reject: any) => {
        Conversation
            .find()
            .and([
                { 'users.userId': userIds[0] },
                { 'users.userId': userIds[1] }
            ])
            .sort({ updatedOn: 'desc' })
            .limit(1)
            .exec((error: any, result: any) => {
                if (error) {
                    reject('Error getting conversation: ' + error);
                } else {
                    if(result.length > 0) {
                        resolve(result[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
    });
}

export function getUnreadForUser(userId: string): Promise<IConversation[]> {
    return new Promise((resolve: any, reject: any) => {
        Conversation
            .find({
                users: {
                    $elemMatch: {
                        $and: [
                            { userId: userId}, 
                            { read: false }
                    ]}
                }
            })
            .exec((error: any, result: IConversation[]) => {
                if (error) {
                    reject('Error getting conversations: ' + error);
                } else {
                    resolve(result);
                }
            });
    });
};

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
