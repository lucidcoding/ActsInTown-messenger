import express = require('express');
import jwt = require('jsonwebtoken');
import { IConversation } from '../interfaces/conversation.interface';
import { IMessage } from '../interfaces/message.interface';
import { StartConversationRequest } from '../requests/conversation/start.conversation.request';
import conversationRepository = require('../repositories/conversation.repository');
import messageRepository = require('../repositories/message.repository');
import { broadcastTo } from './socket.service';
var uuid = require('node-uuid-generator');
var app = express();

export function isAuthorizedForConversation(req:express.Request, res:express.Response, next:Function): any {
    conversationRepository.get(req.params.conversationId || req.body.conversationId)
        .then((conversation: IConversation) => {
            let conversationUser: any = conversation.users.find((user: any) => {
                return user.userId.toLowerCase() === req.user.id;
            });

            if (typeof conversationUser === 'undefined' || conversationUser === null) {
                return res.send(403);
            }

            next();
        })
        .catch((error: string) => {
            return res.send(500);
        });
};
