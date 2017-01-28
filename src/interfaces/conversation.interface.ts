export interface IConversation {
    _id: any,
    startedOn: Date;
    deleted: boolean;
    updatedOn: Date;
    usersToIds: string[];
}
