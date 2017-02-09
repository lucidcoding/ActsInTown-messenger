"use strict";
var conversation = require("./controllers/conversation/index");
var message = require("./controllers/message/index");
var routesConfig = function (app) {
    app.use('/conversation', conversation);
    app.use('/message', message);
    app.use(function (req, res, next) {
        res.status(404);
        res.send({ message: 'Not found' });
        return;
    });
};
module.exports = routesConfig;
