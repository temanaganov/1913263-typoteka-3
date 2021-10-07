'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const status = require(`../../status-codes`);
const data = require(`../../../mocks.json`);

const startServer = async () => {
  try {
    const DEFAULT_PORT = 3000;
    const port = parseInt(process.argv[3], 10) || DEFAULT_PORT;
    const titles = data.map((item) => item.title);

    const listItems = titles.map((title) => `<li>${title}</li>`).join(``);

    const responseText = `
    <!DOCTYPE html>
      <html lang="ru">
      <head>
        <title>Titles</title>
      </head>
      <body>
        <ul>${listItems}</ul>
      </body>
    </html>`;

    const listener = (req, res) => {
      res.writeHead(status.HTTP_SUCCESS_CODE, {
        'Content-Type': `text/html; charset=UTF-8`,
      });

      if (req.url === `/`) {
        res.end(responseText);
      }
    };

    const httpServer = http.createServer(listener);

    httpServer.listen(port, () => {
      console.info(chalk.green(`Server started at port ${port}`));
    });

    httpServer.on(`error`, ({message}) => {
      console.error(chalk.red(`Ошибка: ${message}`));
    });
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(1);
  }
};

module.exports = {
  name: `--server`,
  run: startServer,
};
