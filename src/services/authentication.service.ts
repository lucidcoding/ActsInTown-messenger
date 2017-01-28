import express = require('express');
import jwt = require('jsonwebtoken');
var app = express();

export function isAuthenticated() {
    return app.use((req:express.Request, res:express.Response, next:Function) => {
        if (typeof req.headers['authorization'] === 'undefined' || req.headers['authorization'] === null) {
            return res.send(401);
        }
        
        let authorizationHeader = req.headers['authorization'];
        let token = authorizationHeader.substring(7);
        
        jwt.verify(token, 'hd6620asj#d9/dw', (err: any, decoded: any) => {
            if (err) {
                return next(err);
            } else {
                req.user =  decoded;
                next();
            }
        });
    });
};
