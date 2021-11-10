/* eslint-disable no-unused-vars */
/* eslint-disable indent */
'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const asyncHandler = require(`express-async-handler`);
const {readJSONFile} = require(`../../utils`);
const status = require(`../../status-codes`);
const apiRouter = require(`../api`);


const DEFAULT_PORT = 3000;
const port = parseInt(process.argv[3], 10) || DEFAULT_PORT;
const app = express();

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

const startServer = () => {
  app.listen(port, () => {
    console.info(chalk.green(`Server started at port ${port}`));
  });
};

module.exports = {
  name: `--server`,
  run: startServer,
};
