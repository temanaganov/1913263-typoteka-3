'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const {readJSONFile} = require(`../../utils`);
const status = require(`../../status-codes`);

const DEFAULT_PORT = 3000;
const port = parseInt(process.argv[3], 10) || DEFAULT_PORT;

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

const startServer = async () => {
  const listener = async (req, res) => {
    try {
      const data = await readJSONFile(`mocks.json`);
      const titles = data.map((item) => item.title);

      res.writeHead(status.HTTP_SUCCESS_CODE, {
        'Content-Type': `text/html; charset=UTF-8`,
      });

      if (req.url === `/`) {
        res.end(getResponseText(titles));
      }
    } catch (error) {
      console.error(chalk.red(error));

      res.writeHead(status.NOT_FOUND, {
        'Content-Type': `text/html; charset=UTF-8`,
      });

      res.end(`Not found`);
    }
  };

  const httpServer = http.createServer(listener);

  httpServer.listen(port, () => {
    console.info(chalk.green(`Server started at port ${port}`));
  });

  httpServer.on(`error`, ({message}) => {
    console.error(chalk.red(`Ошибка: ${message}`));
  });
};

module.exports = {
  name: `--server`,
  run: startServer,
};
