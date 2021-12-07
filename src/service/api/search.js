'use strict';

const {Router} = require(`express`);
const HttpCode = require(`../../status-codes`);


module.exports = (app, service) => {
  const searchRouter = new Router();
  app.use(`/search`, searchRouter);

  searchRouter.get(`/`, async (req, res) => {
    const {query} = req.query;

    if (!query) {
      return res.status(HttpCode.BAD_REQUEST).send(`Query string is absent`);
    }

    const result = await service.find(query);

    if (!result.length > 0) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(result);
  });
};
