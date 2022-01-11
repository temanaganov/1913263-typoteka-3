'use strict';

const version = require(`./version`);
const help = require(`./help`);
const fillDb = require(`./fillDb`);
const server = require(`./server`);

const cli = {
  [version.name]: version,
  [help.name]: help,
  [fillDb.name]: fillDb,
  [server.name]: server,
};

module.exports = cli;
