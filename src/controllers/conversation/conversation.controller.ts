import express = require('express');
import StartConversationRequest = require('../../requests/conversation/start.conversation.request');
import Conversation = require('../../entities/conversation.entity');
import ConversationModel = require('../../models/conversation.model');

export function test(req: express.Request, res: express.Response) {
    res.status(200).json({ val: 'ok' });
}

export function start(req: express.Request, res: express.Response) {
    console.log('start');
    
    var request: StartConversationRequest = {
        usersToIds: req.body.usersToIds,
        messageBody: req.body.messageBody
    };
    
    var conversation = Conversation.start(request);
    let conversationModel = new ConversationModel(conversation);
    
    conversationModel.save((err: any) => {
        if (err) {
            res.status(500).json({ val: err });
        } else {
            res.status(201).json({ val: 'ok' });
        }
    });
}
