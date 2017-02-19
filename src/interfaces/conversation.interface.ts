export interface IConversation {
    _id: any,
    startedOn: Date;
    deleted: boolean;
    updatedOn: Date;
    users: {
        userId: string;
        read: boolean;
    }[];
}
