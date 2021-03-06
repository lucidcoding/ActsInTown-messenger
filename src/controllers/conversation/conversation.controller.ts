import express = require('express');
import { Types } from 'mongoose';
import { StartConversationRequest } from '../../requests/conversation/start.conversation.request';
import { Message } from '../../models/message.model';
import { Conversation } from '../../models/conversation.model';
import { IConversation } from '../../interfaces/conversation.interface';
import conversationService = require('../../services/conversation.service');
import conversationRepository = require('../../repositories/conversation.repository');

export function get(req: express.Request, res: express.Response) {
    conversationService.get(req.params.conversationId, req.user.id)
        .then((result: IConversation) => {
            res.status(200).json(result);
        })
        .catch((error: string) => {
            res.status(500).json({ error: error });
        });
}

export function getForCurrentUser(req: express.Request, res: express.Response) {
   conversationService.getForCurrentUser(req.user.id, req.params.page, req.params.pageSize)
        .then((result: IConversation[]) => {
            res.status(200).json(result);
        })
        .catch((error: string) => {
            res.status(500).json({ error: error });
        });
}

export function getForCurrentUserAndUser(req: express.Request, res: express.Response) {
    conversationService.getForCurrentUserAndUser(req.user.id, req.params.userId)
        .then((result: IConversation) => {
            res.status(200).json(result);
        })
        .catch((error: string) => {
            res.status(500).json({ error: error });
        });
}

export function start(req: express.Request, res: express.Response) {
    var request: StartConversationRequest = {
        userId: req.user.id,
        usersToIds: req.body.usersToIds
    };
    
    conversationService.start(request)
        .then((result: string) => {
            res.status(201).json(result);
        })
        .catch((error: string) => {
            res.status(500).json({ error: error });
        })
}
