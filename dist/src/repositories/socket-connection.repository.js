"use strict";
var socket_connection_model_1 = require("../models/socket-connection.model");
function getLatestByUserId(userId) {
    return new Promise(function (resolve, reject) {
        socket_connection_model_1.SocketConnection
            .find({ 'userId': userId })
            .sort({ addedOn: 'desc' })
            .limit(1)
            .exec(function (error, result) {
            if (error) {
                reject('Error getting socket connection: ' + error);
            }
            else {
                var socketConnection = result[0];
                resolve(socketConnection);
            }
        });
    });
}
exports.getLatestByUserId = getLatestByUserId;
function save(socketConnection) {
    var socketConnectionModel = new socket_connection_model_1.SocketConnection(socketConnection);
    return new Promise(function (resolve, reject) {
        socketConnectionModel.save(function (err) {
            if (err) {
                reject('Error creating socket connection: ' + err);
            }
            else {
                resolve(socketConnection);
            }
        });
    });
}
exports.save = save;
