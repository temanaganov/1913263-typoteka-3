'use strict';

const error404Middleware = (req, res) => {
  res.status(404).render(`404`);
};

module.exports = error404Middleware;
