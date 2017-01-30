import express = require('express');
import { Types } from 'mongoose';
import { PostMessageRequest } from '../../requests/message/post.message.request';
import { Message } from '../../models/message.model';
import { IMessage } from '../../interfaces/message.interface';
import messageService = require('../../services/message.service');

export function getForConversation(req: express.Request, res: express.Response) {
    messageService.getForConversation(req.params.conversationId)
        .then((result: IMessage[]) => {
            res.status(200).json(result);
        })
        .catch((error: string) => {
            res.status(500).json({ error: error });
        });
}

export function post(req: express.Request, res: express.Response) {
    var request: PostMessageRequest = {
        userId: req.user.id,
        conversationId: req.body.conversationId,
        body: req.body.body
    };
            
    messageService.post(request)
        .then((result: string) => {
            res.status(201).json({ result: result });
        })
        .catch((error: string) => {
            res.status(500).json({ error: error });
        });
}
