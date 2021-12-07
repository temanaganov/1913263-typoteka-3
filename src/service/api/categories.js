'use strict';

const {Router} = require(`express`);
const HttpCode = require(`../../status-codes`);


module.exports = (app, service) => {
  const categoryRouter = new Router();
  app.use(`/categories`, categoryRouter);

  categoryRouter.get(`/`, async (req, res) => {
    const categories = await service.findAll();

    if (!categories) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(categories);
  });
};
