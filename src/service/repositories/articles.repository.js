'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticlesRepository {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }

  findOne(articleId) {
    return this._articles.find((item) => item.id === articleId);
  }

  create(article) {
    const newArticle = {...article, id: nanoid(MAX_ID_LENGTH), createdDate: new Date().toISOString(), comments: []};
    this._articles.push(newArticle);
    return newArticle;
  }

  update(articleId, article) {
    const oldArticle = this._articles.find((item) => item.id === articleId);
    this._articles = this._articles.map((item) =>
      item.id === articleId ? {...oldArticle, ...article} : item
    );
    return {...oldArticle, ...article};
  }

  remove(article) {
    this._articles = this._articles.filter((item) => item.id !== article.id);
    return article;
  }

  addComment(articleId, text) {
    const newComment = {id: nanoid(MAX_ID_LENGTH), text};

    this._articles = this._articles.map((item) =>
      item.id === articleId ? {...item, comments: [...item.comments, newComment]} : item
    );

    return newComment;
  }

  removeComment(article, comment) {
    this._articles = this._articles.map((item) =>
      item.id === article.id ? {...item, comments: item.comments.filter(({id}) => id !== comment.id)} : item
    );

    return comment;
  }
}

module.exports = ArticlesRepository;
