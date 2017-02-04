"use strict";
/// <reference path="../server.ts"/>
var io = require("socket.io");
//import _ = require('lodash');
//var DB = require('@scadmin/tribo-db');
//var socketioJwt = require('socketio-jwt');
var jwt = require("jsonwebtoken");
/*var config = require('config');
var redis = require('redis').createClient;
var adapter = require('socket.io-redis');*/
var socket_connection_model_1 = require("../models/socket-connection.model");
var uuid = require('node-uuid-generator');
var socketIo;
/**
 * Bind socket.io to the express server
 * @param {Object} express server
 */
function listen(app) {
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
    setInterval(function () {
        socketIo.emit('heartbeat', 1);
    }, 5000);
    socketIo.on("error", function (error) {
        console.log('Error: ' + error);
    });
    socketIo.on("unauthorized", function (error) {
        console.log('Unauthorized: ' + error);
    });
    socketIo.set('authorization', function (handshake, callback) {
        var token = handshake._query.token;
        if (typeof token !== 'undefined' && token !== null) {
            jwt.verify(token, 'hd6620asj#d9/dw', function (err, decoded) {
                if (err) {
                    console.log('Connection error: ' + err.message);
                    callback(err.message, false);
                }
                else {
                    handshake.decodedToken = decoded;
                    callback(null, true);
                }
            });
        }
        else {
            console.log('Connection error: no token');
            callback('No token', false);
        }
    });
    socketIo.on('connection', function (socket) {
        console.log('Connected on socket: ' + socket.id);
        jwt.verify(socket.handshake.query.token, 'hd6620asj#d9/dw', function (err, decoded) {
            console.log('token: ' + JSON.stringify(decoded));
            var userId = decoded.id;
            var socketConnection = new socket_connection_model_1.SocketConnection({
                _id: uuid.generate(),
                userId: userId,
                socketId: socket.id,
                addedOn: new Date(),
                deleted: false
            });
            socketConnection.save(function (err) {
                if (err) {
                    console.log('Error saving socket: ' + err);
                }
                else {
                    console.log('Socket connection saved');
                }
            });
        });
    });
    socketIo.on('disconnect', function () {
        console.log('A user disconnected');
    });
}
exports.listen = listen;
function broadcastTo(userId, event, data) {
    return new Promise(function (resolve, reject) {
        //socketIo.emit(event, data);
        //resolve();
        socket_connection_model_1.SocketConnection
            .find({ 'userId': userId })
            .sort({ addedOn: 'desc' })
            .limit(1)
            .exec(function (error, result) {
            if (error) {
                reject('Error getting user: ' + error);
            }
            else {
                var socketConnection = result[0];
                var socketId = socketConnection.socketId;
                socketIo.to(socketId).emit(event, data);
                resolve();
            }
        });
    });
}
exports.broadcastTo = broadcastTo;
