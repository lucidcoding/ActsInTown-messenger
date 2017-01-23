/// <reference path="../server.ts"/>
import io = require('socket.io');
//import _ = require('lodash');
//var DB = require('@scadmin/tribo-db');
//var socketioJwt = require('socketio-jwt');
import jwt = require('jsonwebtoken');
/*var config = require('config');
var redis = require('redis').createClient;
var adapter = require('socket.io-redis');*/

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

	/*setInterval(function() {
		socketIo.emit('heartbeat', 1);
	}, 5000);*/

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
        console.log('connected...');

        jwt.verify(socket.handshake.query.token, 'hd6620asj#d9/dw', (err: any, decoded: any) => {
            console.log('token: ' + JSON.stringify(decoded));
        });
    });

    socketIo.on('disconnect', function() {

        console.log('A user disconnected');
    });
}