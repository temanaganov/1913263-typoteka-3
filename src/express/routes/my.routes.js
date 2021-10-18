'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.render(`my`));
myRouter.get(`/comments`, (req, res) => res.send(req.baseUrl + req.url));

module.exports = myRouter;
