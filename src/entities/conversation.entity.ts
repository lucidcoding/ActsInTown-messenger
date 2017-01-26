import StartConversationRequest = require('../requests/conversation/start.conversation.request')

class Conversation {
    public _id: string;
    public startedOn: Date;
    public deleted: boolean;
    public updatedOn: Date;
    public usersToIds: string[];
  
    static start(request: StartConversationRequest): Conversation {
        let now = new Date();
        var conversation = new Conversation();
        conversation._id = 'test-id';
        conversation.startedOn = now;
        conversation.deleted = false;
        conversation.updatedOn = now;
        conversation.usersToIds = request.usersToIds;
        return conversation;
    }
}

export = Conversation;
