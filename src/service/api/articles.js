'use strict';

const {Router} = require(`express`);
const HttpCode = require(`../../status-codes`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExists = require(`../middlewares/article-exists`);
const commentValidator = require(`../middlewares/comment-validator`);
const commentExists = require(`../middlewares/comment-exists`);

const articlesRouter = new Router();

module.exports = (app, service) => {
  app.use(`/articles`, articlesRouter);

  articlesRouter.get(`/`, async (req, res) => {
    const articles = await service.findAll();

    if (!articles) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(articles);
  });

  articlesRouter.get(`/:articleId`, articleExists(service), async (req, res) => {
    const {article} = res.locals;
    return res.status(HttpCode.OK).json(article);
  });

  articlesRouter.post(`/`, articleValidator, async (req, res) => {
    const article = req.body;
    const newArticle = await service.create(article);

    return res.status(HttpCode.CREATED).json(newArticle);
  });

  articlesRouter.put(`/:articleId`, articleExists(service), articleValidator, async (req, res) => {
    const {articleId} = req.params;
    const article = req.body;
    const newArticle = await service.update(articleId, article);

    return res.status(HttpCode.OK).json(newArticle);
  });

  articlesRouter.delete(`/:articleId`, articleExists(service), async (req, res) => {
    const article = await service.remove(res.locals.article);
    return res.status(HttpCode.OK).json(article);
  });

  articlesRouter.get(`/:articleId/comments/`, articleExists(service), async (req, res) => {
    const {article} = res.locals;
    const comments = article.comments;

    return res.status(HttpCode.OK).json(comments);
  });

  articlesRouter.post(`/:articleId/comments/`, commentValidator, articleExists(service), async (req, res) => {
    const {articleId} = req.params;
    const {text} = req.body;
    const newComment = await service.addComment(articleId, text);

    return res.status(HttpCode.CREATED).json(newComment);
  });

  articlesRouter.delete(`/:articleId/comments/:commentId`, articleExists(service), commentExists, async (req, res) => {
    const {article, comment} = res.locals;
    await service.removeComment(article, comment);

    return res.status(HttpCode.OK).json(comment);
  });
};
