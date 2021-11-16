'use strict';

const HttpCode = require(`../../status-codes`);

module.exports = async (req, res, next) => {
  const {article} = res.locals;
  const {commentId} = req.params;

  const comment = article.comments.find((item) => item.id === commentId);

  if (!comment) {
    return res.status(HttpCode.NOT_FOUND).send(`Comment with id ${commentId} not found`);
  }

  res.locals.comment = comment;

  return next();
};
