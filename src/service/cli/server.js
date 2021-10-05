'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const status = require(`../../status-codes`);
const {readFile} = require(`../../utils`);

const startServer = async () => {
  const TITLES = await readFile(`data/titles.txt`);
  const DEFAULT_PORT = 3000;
  const port = parseInt(process.argv[3], 10) || DEFAULT_PORT;

  const responseText = `
<!DOCTYPE html>
  <html lang="ru">
  <head>
    <title>Titles</title>
  </head>
  <body>
    <ul>
      ${TITLES.map((title) => `<li>${title}</li>`)}
    </ul>
  </body>
</html>`;

  const listener = (req, res) => {
    console.log(`fsdf`);
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
};

module.exports = {
  name: `--server`,
  run: startServer,
};
