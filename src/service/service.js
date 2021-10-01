'use strict';

const cli = require(`./cli`);
const help = require(`./cli/help`);

const flag = process.argv[2];

if (!flag) {
  help.run();
} else {
  cli[flag].run();
}

process.exit(0);
