'use strict';

const cli = require(`./cli`);

const help = require(`./cli/help`);

const startService = async () => {
  const flag = process.argv[2];

  if (!flag) {
    help.run();
  } else {
    await cli[flag].run();
  }

  process.exit(0);
};

startService();
