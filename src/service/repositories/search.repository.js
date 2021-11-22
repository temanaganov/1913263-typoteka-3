'use strict';

class SearchRepository {
  constructor(articles) {
    this._articles = articles;
  }

  find(query) {
    return this._articles.filter((item) => item.title.toUpperCase().includes(query.toUpperCase()));
  }
}

module.exports = SearchRepository;
