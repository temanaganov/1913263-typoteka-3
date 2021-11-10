'use strict';

class SearchController {
  constructor(articles) {
    this._articles = articles;
  }

  find(query) {
    return this._articles.filter((item) => item.title.toUpperCase().includes(query.toUpperCase()));
  }
}

module.exports = SearchController;
