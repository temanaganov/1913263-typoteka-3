'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const articlesRouter = require(`./routes/articles.routes`);
const myRouter = require(`./routes/my.routes`);
const mainRouter = require(`./routes/main.routes`);

const PORT = process.env.PORT || 8080;
const app = express();

app.use(`/articles`, articlesRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);

app.listen(PORT, () => {
  console.log(chalk.green(`Server started at port ${PORT}`));
});
