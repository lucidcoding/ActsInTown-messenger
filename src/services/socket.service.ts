/// <reference path="../server.ts"/>
import io = require('socket.io');
//import _ = require('lodash');
//var DB = require('@scadmin/tribo-db');
//var socketioJwt = require('socketio-jwt');
import jwt = require('jsonwebtoken');
/*var config = require('config');
var redis = require('redis').createClient;
var adapter = require('socket.io-redis');*/
//import { SocketConnection } from '../models/socket-connection.model';
import { ISocketConnection } from '../interfaces/socket-connection.interface';
import socketConnectionRepository = require('../repositories/socket-connection.repository');
var uuid = require('node-uuid-generator');

var socketIo: any;

/**
 * Bind socket.io to the express server
 * @param {Object} express server
 */
export function listen(app: Object): void {




    socketIo = io.listen(app);

    //var pub = redis(config.get('redisConnection.port'), config.get('redisConnection.host'), { return_buffers: true, auth_pass: config.get('redisConnection.auth_pass') });
    //var sub = redis(config.get('redisConnection.port'), config.get('redisConnection.host'), { return_buffers: true, auth_pass: config.get('redisConnection.auth_pass') });

    //socketIo.adapter(adapter({ pubClient: pub, subClient: sub }));

    /*socketIo.on('connection', socketioJwt.authorize({
        secret: '',
        timeout: 15000 // 15 seconds to send the authentication message 
    })).on('authenticated', (socket: any) => {
        //this socket is authenticated, we are good to handle more events from it. 
        console.log('hello! ' + socket.decoded_token.name);
    });
  */

	/*socketIo.use(socketioJwt.authorize({
		secret: 'my-trusted-client:',//config.get('secret'),
		handshake: true
	}));*/

	setInterval(function() {
		socketIo.emit('heartbeat', 1);
	}, 5000);

    socketIo.on("error", (error: any) => {
        console.log('Error: ' + error);
    });

    socketIo.on("unauthorized", (error: any) => {
        console.log('Unauthorized: ' + error);
    });

    socketIo.set('authorization', (handshake: any, callback: any) => {
        var token = handshake._query.token;

        if (typeof token !== 'undefined' && token !== null) {
            jwt.verify(token, 'hd6620asj#d9/dw', (err: any, decoded: any) => {
                if (err) {
                    console.log('Connection error: ' + err.message);
                    callback(err.message, false);
                }
                else {
                    handshake.decodedToken = decoded;
                    callback(null, true);
                }
            });
        } else {
            console.log('Connection error: no token');
            callback('No token', false);
        }
    });

    socketIo.on('connection', (socket: any) => {
        console.log('Connected on socket: ' + socket.id);

        jwt.verify(socket.handshake.query.token, 'hd6620asj#d9/dw', (err: any, decoded: any) => {
            console.log('token: ' + JSON.stringify(decoded));
            let userId = decoded.id;

            let socketConnection: ISocketConnection = {
                _id: uuid.generate(),
                userId: userId,
                socketId: socket.id,
                addedOn: new Date(),
                deleted: false
            };

            socketConnectionRepository.save(socketConnection)
                .then((result: ISocketConnection) => {
                    console.log('Socket connection saved');
                })
                .catch((error: string) => {
                    console.log('Error saving socket: ' + err);
                });
        });
    });

    socketIo.on('disconnect', () => {
        console.log('A user disconnected');
    });
}

export function broadcastTo(userId: string, event: string, data?: Object): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        socketConnectionRepository.getLatestByUserId(userId)
            .then((socketConnection: ISocketConnection) => {
                let socketId = socketConnection.socketId;
                socketIo.to(socketId).emit(event, data);
                resolve();
            })
            .catch((error: string) => {
                reject('Error getting socket: ' + error);
            });
    });
		//socketIo.emit(event, data);

        //resolve();
        /* SocketConnection
            .find({ 'userId': userId })
            .sort({ addedOn: 'desc' })
            .limit(1)
            .exec((error: any, result: ISocketConnection[]) => {
                if (error) {
                    reject('Error getting user: ' + error);
                } else {
                    let socketConnection: ISocketConnection = result[0];
                    let socketId = socketConnection.socketId;
                    socketIo.to(socketId).emit(event, data);
                    resolve();
                }
            });*/
}
