'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.send(req.baseUrl + req.url));
myRouter.get(`/comments`, (req, res) => res.send(req.baseUrl + req.url));

module.exports = myRouter;
