'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const articlesRouter = new Router();
const api = getAPI();

articlesRouter.get(`/category/:id`, (req, res) => res.send(req.baseUrl + req.url));

articlesRouter.get(`/add`, (req, res) => res.render(`create-post`));

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const article = api.getArticle(id);
  res.render(`edit-post`, {article});
});

articlesRouter.get(`/:id`, (req, res) => res.send(req.baseUrl + req.url));

articlesRouter.post(`/add`, async (req, res) => {
  const article = req.body;
  try {
    await api.createArticle(article);
    res.redirect(`/my`);
  } catch (err) {
    res.redirect(`/articles/add`);
  }
});

module.exports = articlesRouter;
