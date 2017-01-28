"use strict";
var express = require("express");
var jwt = require("jsonwebtoken");
var app = express();
function isAuthenticated() {
    return app.use(function (req, res, next) {
        if (typeof req.headers['authorization'] === 'undefined' || req.headers['authorization'] === null) {
            return res.send(401);
        }
        var authorizationHeader = req.headers['authorization'];
        var token = authorizationHeader.substring(7);
        jwt.verify(token, 'hd6620asj#d9/dw', function (err, decoded) {
            if (err) {
                return next(err);
            }
            else {
                req.user = decoded;
                next();
            }
        });
    });
}
exports.isAuthenticated = isAuthenticated;
;
