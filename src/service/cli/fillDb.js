/* eslint-disable camelcase */
'use strict';

const chalk = require(`chalk`);
const {getRandomInt, getRandomSubarray, shuffle, getRandomDate, readFile} = require(`../../utils`);
const sequelize = require(`../lib/sequelize`);
const {getLogger} = require(`../lib/logger`);
const defineModels = require(`../models`);

const {Article, Category, User, Comment} = defineModels(sequelize);
const logger = getLogger({name: `api`});
const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const COUNT = parseInt(process.argv[3], 10) || DEFAULT_COUNT;

const getTitle = (titles) => {
  return titles[getRandomInt(0, titles.length - 1)];
};

const getCreatedDate = () => {
  const currentDate = new Date();
  const minDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());

  return getRandomDate(minDate).toISOString();
};

const getAnnounce = (announces) => {
  return shuffle(announces).slice(0, getRandomInt(1, 2)).join(` `);
};

const getFullText = (announces) => {
  return shuffle(announces)
    .slice(0, getRandomInt(1, announces.length - 1))
    .join(` `);
};

const getComments = (comments) => {
  const count = getRandomInt(1, 2);

  return Array(count)
    .fill({})
    .map(() => ({
      text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `),
    }));
};

const generateArticles = (count, titles, categories, announces, texts, comments) => (
  Array(count).fill({})
    .map(() => ({
      title: getTitle(titles),
      date: getCreatedDate(),
      announcement: getAnnounce(announces),
      full_text: getFullText(announces),
      comments: getComments(comments),
      categories: getRandomSubarray(categories),
    }))
);

const fillDb = async () => {
  try {
    logger.info(`Trying to connect to database...`);
    await sequelize.authenticate();
    await sequelize.sync({force: true});
  } catch (err) {
    logger.error(`An error occurred: ${err.message}`);
    process.exit(1);
  }
  try {
    if (COUNT > MAX_COUNT) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(1);
    }

    const [TITLES, ANNOUNCES, CATEGORIES, COMMENTS] = await Promise.all([
      readFile(`data/titles.txt`),
      readFile(`data/sentences.txt`),
      readFile(`data/categories.txt`),
      readFile(`data/comments.txt`),
    ]);

    const categoryModels = await Category.bulkCreate(
        CATEGORIES.map((title) => ({title}))
    );

    const articles = generateArticles(COUNT, TITLES, categoryModels, ANNOUNCES, ANNOUNCES, COMMENTS);
    const articlePromises = articles.map(async (article) => {
      const articleModel = await Article.create(article, {include: [`comments`]});

      await articleModel.addCategories(article.categories);
    });

    await Promise.all(articlePromises);
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(1);
  }
};

module.exports = {
  name: `--filldb`,
  run: fillDb,
};
