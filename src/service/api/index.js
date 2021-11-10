'use strict';

const {Router} = require(`express`);
const articlesRouter = require(`./articles`);
const categoriesRouter = require(`./categories`);
const searchRouter = require(`./search`);
const getMockData = require(`../lib/get-mock-data`);
const ArticlesController = require(`../controllers/articles.controller`);
const CategoriesController = require(`../controllers/categories.controller`);
const CommentsController = require(`../controllers/comments.controller`);
const SearchController = require(`../controllers/search.controller`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  articlesRouter(app, new ArticlesController(mockData), new CommentsController(mockData));
  categoriesRouter(app, new CategoriesController(mockData));
  searchRouter(app, new SearchController(mockData));
})();

module.exports = app;
