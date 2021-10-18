/* eslint-disable no-unused-vars */
'use strict';

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render(`500`);
};

module.exports = errorMiddleware;
