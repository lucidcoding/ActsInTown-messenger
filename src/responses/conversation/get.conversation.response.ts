import { IConversation } from '../../interfaces/conversation.interface';

export interface GetConversationResponse {
    entity: IConversation,
    otherUserIds: string[]
}
