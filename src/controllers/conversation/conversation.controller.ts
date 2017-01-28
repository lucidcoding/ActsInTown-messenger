import express = require('express');
import { Types } from 'mongoose';
import { StartConversationRequest } from '../../requests/conversation/start.conversation.request';
import { Message } from '../../models/message.model';
import { Conversation } from '../../models/conversation.model';
import conversationService = require('../../services/conversation.service');

export function test(req: express.Request, res: express.Response) {
    let message = Message
        .findOne({'_id':'28723601-4811-4CF1-97CD-B5FEEFCD0C36'})
        .populate('conversation')
        .exec((error: any, result: any) => {
            
            res.status(200).json(message);
        });
        
}

export function start(req: express.Request, res: express.Response) {
    console.log('start');
    
    var request: StartConversationRequest = {
        id: req.params.id,
        usersToIds: req.body.usersToIds,
        messageBody: req.body.messageBody
    };
    
    conversationService.start(request)
        .then((result: string) => {
            res.status(201).json({ result: result });
        })
        .catch((error: string) => {
            res.status(500).json({ error: error });
        })
}
