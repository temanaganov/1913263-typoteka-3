'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const path = require(`path`);
const {PORT} = require(`./env`);
const articlesRouter = require(`./routes/articles.routes`);
const myRouter = require(`./routes/my.routes`);
const mainRouter = require(`./routes/main.routes`);
const error500Middleware = require(`./middlewares/error500.middleware`);
const error404Middleware = require(`./middlewares/error404.middleware`);

const app = express();

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);
app.locals.basedir = app.get(`views`);

app.use(express.static(path.resolve(__dirname, `public`)));
app.use(`/articles`, articlesRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);
app.use(error500Middleware);
app.use(error404Middleware);

app.listen(PORT, () => {
  console.log(chalk.green(`Server started at port ${PORT}`));
});
