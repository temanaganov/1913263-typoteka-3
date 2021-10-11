'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const path = require(`path`);
const articlesRouter = require(`./routes/articles.routes`);
const myRouter = require(`./routes/my.routes`);
const mainRouter = require(`./routes/main.routes`);

const PORT = process.env.PORT || 8080;
const app = express();

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);
app.locals.basedir = app.get(`views`);

app.use(express.static(path.resolve(__dirname, `public`)));
app.use(`/articles`, articlesRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);

app.listen(PORT, () => {
  console.log(chalk.green(`Server started at port ${PORT}`));
});
