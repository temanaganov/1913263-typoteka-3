'use strict';

const {Router} = require(`express`);
const HttpCode = require(`../../status-codes`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExists = require(`../middlewares/article-exists`);
const commentValidator = require(`../middlewares/comment-validator`);
const commentExists = require(`../middlewares/comment-exists`);

const articlesRouter = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, articlesRouter);

  articlesRouter.get(`/`, async (req, res) => {
    const articles = await articleService.findAll();

    if (!articles) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(articles);
  });

  articlesRouter.get(`/:articleId`, articleExists(articleService), async (req, res) => {
    const {article} = res.locals;
    return res.status(HttpCode.OK).json(article);
  });

  articlesRouter.post(`/`, articleValidator, async (req, res) => {
    const article = req.body;
    const newArticle = await articleService.create(article);

    return res.status(HttpCode.CREATED).json(newArticle);
  });

  articlesRouter.put(`/:articleId`, articleExists(articleService), async (req, res) => {
    const {articleId} = req.params;
    const article = req.body;
    const newArticle = await articleService.update(articleId, article);

    return res.status(HttpCode.OK).json(newArticle);
  });

  articlesRouter.delete(`/:articleId`, articleExists(articleService), async (req, res) => {
    const article = await articleService.remove(res.locals.article);
    return res.status(HttpCode.OK).json(article);
  });

  articlesRouter.get(`/:articleId/comments/`, articleExists(articleService), async (req, res) => {
    const {article} = res.locals;
    const comments = article.comments;

    return res.status(HttpCode.OK).json(comments);
  });

  articlesRouter.post(`/:articleId/comments/`, commentValidator, articleExists(articleService), async (req, res) => {
    const {articleId} = req.params;
    const {text} = req.body;
    const newComment = await commentService.create(articleId, text);

    return res.status(HttpCode.CREATED).json(newComment);
  });

  articlesRouter.delete(`/:articleId/comments/:commentId`, articleExists(articleService), commentExists, async (req, res) => {
    const {article, comment} = res.locals;
    await commentService.remove(article, comment);

    return res.status(HttpCode.OK).json(comment);
  });
};
