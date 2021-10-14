'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.send(req.baseUrl + req.url));
mainRouter.get(`/register`, (req, res) => res.send(req.baseUrl + req.url));
mainRouter.get(`/login`, (req, res) => res.send(req.baseUrl + req.url));
mainRouter.get(`/search`, (req, res) => res.send(req.baseUrl + req.url));
mainRouter.get(`/categories`, (req, res) => res.send(req.baseUrl + req.url));

module.exports = mainRouter;
