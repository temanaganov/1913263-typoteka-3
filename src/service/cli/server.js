/* eslint-disable no-unused-vars */
/* eslint-disable indent */
'use strict';

const express = require(`express`);
const asyncHandler = require(`express-async-handler`);
const {readJSONFile} = require(`../../utils`);
const status = require(`../../status-codes`);
const apiRouter = require(`../api`);
const {getLogger} = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const HttpCode = require(`../../status-codes`);

const DEFAULT_PORT = 3000;
const port = parseInt(process.argv[3], 10) || DEFAULT_PORT;
const app = express();
const logger = getLogger({name: `api`});

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

app.use(express.json());
app.use(`/api`, apiRouter);

const getResponseText = (titles) => {
  const listItems = titles.map((title) => `<li>${title}</li>`).join(``);

  return `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <title>Titles</title>
      </head>
      <body>
        <ul>${listItems}</ul>
      </body>
    </html>`;
};

app.get(
  `/`,
  asyncHandler(async (req, res, next) => {
    const data = await readJSONFile(`mocks.json`);
    const titles = data.map((item) => item.title);
    res.send(getResponseText(titles));
    res.status(status.NOT_FOUND).send(`Not found`);
  })
);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});

const startServer = () => {
  try {
    app.listen(port, (err) => {
      if (err) {
        return logger.error(`An error occurred on server creation: ${err.message}`);
      }

      return logger.info(`Server started at port ${port}`);
    });
  } catch (err) {
    logger.error(`An error occurred: ${err.message}`);
    process.exit(1);
  }
};

const dbAuthenticate = async () => {
  try {
    logger.info(`Trying to connect to database...`);
    await sequelize.authenticate();
    defineModels(sequelize);
    await sequelize.sync();
    logger.info(`Successfully connected to database...`);
  } catch (err) {
    logger.error(`An error occurred: ${err.message}`);
    process.exit(1);
  }
};

module.exports = {
  name: `--server`,
  run: dbAuthenticate,
};
