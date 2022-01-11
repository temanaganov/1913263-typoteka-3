'use strict';

const defineArticle = require(`./article`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineUser = require(`./user`);
const {Model} = require(`sequelize`);

const define = (sequelize) => {
  const Article = defineArticle(sequelize);
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const User = defineUser(sequelize);

  Article.hasMany(Comment, {as: `comments`, foreignKey: `article_id`, onDelete: `cascade`});
  Comment.belongsTo(Article, {foreignKey: `article_id`});

  User.hasMany(Article, {as: `articles`, foreignKey: `user_id`, onDelete: `cascade`});
  Article.belongsTo(User, {foreignKey: `user_id`});

  User.hasMany(Comment, {as: `comments`, foreignKey: `user_id`, onDelete: `cascade`});
  Comment.belongsTo(User, {foreignKey: `user_id`});

  class ArticleCategory extends Model {}

  ArticleCategory.init({}, {sequelize, modelName: `ArticleCategory`, tableName: `articles_categories`});

  Article.belongsToMany(Category, {through: ArticleCategory, as: `categories`, foreignKey: `category_id`});
  Category.belongsToMany(Article, {through: ArticleCategory, as: `articles`, foreignKey: `article_id`});

  return {Article, Category, Comment, User, ArticleCategory};
};

module.exports = define;
