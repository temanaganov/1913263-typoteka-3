'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const {readFile} = require(`../../utils`);
const status = require(`../../status-codes`);

const DEFAULT_PORT = 3000;
const port = parseInt(process.argv[3], 10) || DEFAULT_PORT;
const app = express();

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

app.get(`/`, async (req, res) => {
  try {
    const data = JSON.parse(await readFile(`mocks.json`));
    const titles = data.map((item) => item.title);
    res.send(getResponseText(titles));
  } catch (error) {
    console.error(chalk.red(error));
    res.status(status.NOT_FOUND);
    res.send(`Not found`);
  }
});

const startServer = () => {
  app.listen(port, () => {
    console.info(chalk.green(`Server started at port ${port}`));
  });
};

module.exports = {
  name: `--server`,
  run: startServer,
};
