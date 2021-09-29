'use strict';

const chalk = require(`chalk`);
const {getRandomInt, shuffle, getRandomDate, writeJSONFile, readFile} = require(`../../utils`);

const generate = async () => {
  const TITLES = await readFile(`data/titles.txt`);
  const ANNOUNCES = await readFile(`data/sentences.txt`);
  const CATEGORIES = await readFile(`data/categories.txt`);
  const DEFAULT_COUNT = 1;
  const MAX_COUNT = 1000;

  const count = parseInt(process.argv[3], 10) || DEFAULT_COUNT;

  const getTitle = () => {
    return TITLES[getRandomInt(0, TITLES.length - 1)];
  };

  const getCreatedDate = () => {
    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());

    return getRandomDate(minDate).toISOString();
  };

  const getAnnounce = () => {
    return shuffle(ANNOUNCES).slice(0, getRandomInt(1, 5)).join(` `);
  };

  const getFullText = () => {
    return shuffle(ANNOUNCES)
      .slice(0, getRandomInt(1, ANNOUNCES.length - 1))
      .join(` `);
  };

  const getCategory = () => {
    return shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1));
  };

  if (count > MAX_COUNT) {
    console.error(chalk.red(`Не больше 1000 объявлений`));
    process.exit(1);
  }

  const result = Array(count)
    .fill({})
    .map(() => ({
      title: getTitle(),
      createdDate: getCreatedDate(),
      announce: getAnnounce(),
      fullText: getFullText(),
      category: getCategory(),
    }));

  await writeJSONFile(`mocks.json`, result);
};

module.exports = {
  name: `--generate`,
  run: generate,
};
