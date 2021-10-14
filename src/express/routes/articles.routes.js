'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, (req, res) => res.send(req.baseUrl + req.url));
articlesRouter.get(`/add`, (req, res) => res.send(req.baseUrl + req.url));
articlesRouter.get(`/edit/:id`, (req, res) => res.send(req.baseUrl + req.url));
articlesRouter.get(`/:id`, (req, res) => res.send(req.baseUrl + req.url));

module.exports = articlesRouter;
