'use strict';

const {Router} = require(`express`);
const articlesRouter = require(`./articles`);
const categoriesRouter = require(`./categories`);
const searchRouter = require(`./search`);
const getMockData = require(`../lib/get-mock-data`);
const ArticlesRepository = require(`./../repositories/articles.repository`);
const CategoriesRepository = require(`../repositories/categories.repository`);
const SearchRepository = require(`../repositories/search.repository`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  articlesRouter(app, new ArticlesRepository(mockData));
  categoriesRouter(app, new CategoriesRepository(mockData));
  searchRouter(app, new SearchRepository(mockData));
})();

module.exports = app;
