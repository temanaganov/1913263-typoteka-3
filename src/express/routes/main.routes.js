'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

const mainThemes = [
  {value: `Автомобили`, count: 88, href: `#`},
  {value: `Удаленная работа`, count: 13, href: `#`},
  {value: `Бизнес`, count: 13, href: `#`},
  {value: `Путешествия`, count: 13, href: `#`},
  {value: `Дизайн и обустройство`, count: 13, href: `#`},
  {value: `Производство игрушек`, count: 22, href: `#`},
  {value: `UX & UI`, count: 22, href: `#`},
];

mainRouter.get(`/`, (req, res) => res.render(`main`, {themes: mainThemes}));
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, (req, res) => res.render(`search`));
mainRouter.get(`/categories`, (req, res) => res.send(req.baseUrl + req.url));

module.exports = mainRouter;
