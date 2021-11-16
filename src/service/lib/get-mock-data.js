'use strict';

const chalk = require(`chalk`);
const {readJSONFile} = require(`../../utils`);
const FILENAME = `mocks.json`;

let data = [];

const getMockData = async () => {
  if (data.length > 0) {
    return data;
  }

  try {
    data = await readJSONFile(FILENAME);
  } catch (error) {
    console.error(chalk.red(error));
    return error;
  }

  return data;
};

module.exports = getMockData;
