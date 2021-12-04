'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const mainRouter = new Router();
const api = getAPI();

const mainThemes = [
  {value: `Автомобили`, count: 88, href: `#`},
  {value: `Удаленная работа`, count: 13, href: `#`},
  {value: `Бизнес`, count: 13, href: `#`},
  {value: `Путешествия`, count: 13, href: `#`},
  {value: `Дизайн и обустройство`, count: 13, href: `#`},
  {value: `Производство игрушек`, count: 22, href: `#`},
  {value: `UX & UI`, count: 22, href: `#`},
];

mainRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`main`, {themes: mainThemes, articles});
});
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, async (req, res) => {
  const {query} = req.query;

  if (!query) {
    return res.render(`search`);
  }

  try {
    const result = await api.search(query, {result: {}});
    return res.render(`search`, {result});
  } catch (err) {
    return res.render(`search`, {result: []});
  }
});
mainRouter.get(`/categories`, (req, res) => res.send(req.baseUrl + req.url));

module.exports = mainRouter;
