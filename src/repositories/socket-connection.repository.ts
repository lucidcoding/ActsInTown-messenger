import { SocketConnection, ISocketConnectionModel } from '../models/socket-connection.model';
import { ISocketConnection } from '../interfaces/socket-connection.interface';

export function getLatestByUserId(userId: string): Promise<ISocketConnection> {
    return new Promise((resolve: any, reject: any) => {
        SocketConnection
            .find({ 'userId': userId })
            .sort({ addedOn: 'desc' })
            .limit(1)
            .exec((error: any, result: ISocketConnection[]) => {
                if (error) {
                    reject('Error getting socket connection: ' + error);
                } else {
                    let socketConnection: ISocketConnection = result[0];
                    resolve(socketConnection);
                }
            });
    });
}

export function save(socketConnection: ISocketConnection): Promise<ISocketConnection> {
    let socketConnectionModel: ISocketConnectionModel = new SocketConnection(socketConnection);

    return new Promise((resolve: any, reject: any) => {    
        socketConnectionModel.save((err: any) => {
            if (err) {
                reject('Error creating socket connection: ' + err);
            } else {
                resolve(socketConnection);
            }
        });
    });
}
