'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomSubarray = (items) => {
  items = items.slice();
  let count = getRandomInt(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(
        ...items.splice(
            getRandomInt(0, items.length - 1), 1
        )
    );
  }
  return result;
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
  const data = await fs.readFile(path, `utf-8`);
  return data.trim().split(`\n`);
};

const readJSONFile = async (path) => {
  const data = await fs.readFile(path, `utf-8`);
  return JSON.parse(data);
};

module.exports = {
  getRandomInt,
  getRandomSubarray,
  shuffle,
  getRandomDate,
  writeJSONFile,
  readFile,
  readJSONFile,
};
