'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentsController {
  constructor(articles) {
    this._articles = articles;
  }

  create(articleId, text) {
    const newComment = {id: nanoid(MAX_ID_LENGTH), text};

    this._articles = this._articles.map((item) =>
      item.id === articleId ? {...item, comments: [...item.comments, newComment]} : item
    );

    return newComment;
  }

  remove(article, comment) {
    this._articles = this._articles.map((item) =>
      item.id === article.id ? {...item, comments: item.comments.filter(({id}) => id !== comment.id)} : item
    );

    return comment;
  }
}

module.exports = CommentsController;
