/* eslint-disable indent */
'use strict';

const pino = require(`pino`);
const env = require(`../env`);
const {NODE_ENV} = require(`../../constants`);

const LOG_FILE = `./logs/api.log`;
const isDevMode = env.NODE_ENV === NODE_ENV.DEVELOPMENT;
const defaultLogLevel = isDevMode ? `info` : `error`;

const logger = pino(
  {
    name: `base-logger`,
    level: env.LOG_LEVEL || defaultLogLevel,
    prettyPrint: true,
  },
  isDevMode ? process.stdout : pino.destination(LOG_FILE)
);

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  },
};
