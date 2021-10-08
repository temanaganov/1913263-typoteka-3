'use strict';

const chalk = require(`chalk`);
const {getRandomInt, shuffle, getRandomDate, writeJSONFile, readFile} = require(`../../utils`);

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
  return shuffle(announces).slice(0, getRandomInt(1, 5)).join(` `);
};

const getFullText = (announces) => {
  return shuffle(announces)
    .slice(0, getRandomInt(1, announces.length - 1))
    .join(` `);
};

const getCategory = (categories) => {
  return shuffle(categories).slice(0, getRandomInt(1, categories.length - 1));
};

const generate = async () => {
  try {
    if (COUNT > MAX_COUNT) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(1);
    }

    const [TITLES, ANNOUNCES, CATEGORIES] = await Promise.all([
      readFile(`data/titles.txt`),
      readFile(`data/sentences.txt`),
      readFile(`data/categories.txt`),
    ]);

    const result = Array(COUNT)
      .fill({})
      .map(() => ({
        title: getTitle(TITLES.trim().split(`\n`)),
        createdDate: getCreatedDate(),
        announce: getAnnounce(ANNOUNCES.trim().split(`\n`)),
        fullText: getFullText(ANNOUNCES.trim().split(`\n`)),
        category: getCategory(CATEGORIES.trim().split(`\n`)),
      }));

    await writeJSONFile(`mocks.json`, result);
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(1);
  }
};

module.exports = {
  name: `--generate`,
  run: generate,
};
