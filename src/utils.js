'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getRandomDate = (min, max = Date.now()) => {
  const minTimestamp = new Date(min).getTime();
  const maxTimestamp = new Date(max).getTime();

  return new Date(getRandomInt(minTimestamp, maxTimestamp));
};

const writeJSONFile = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
  console.info(chalk.green(`Operation success. File created.`));
};

const readFile = async (path) => {
  return await fs.readFile(path, `utf-8`);
};

module.exports = {
  getRandomInt,
  shuffle,
  getRandomDate,
  writeJSONFile,
  readFile,
};
