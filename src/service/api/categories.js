'use strict';

const {Router} = require(`express`);
const HttpCode = require(`../../status-codes`);

const categoryRouter = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, categoryRouter);

  categoryRouter.get(`/`, async (req, res) => {
    const categories = await service.findAll();

    if (!categories) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(categories);
  });
};
