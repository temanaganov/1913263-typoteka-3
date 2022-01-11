/* eslint-disable camelcase */
'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Article extends Model {}

const define = (sequelize) => Article.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  announcement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  full_text: DataTypes.TEXT,
  picture: DataTypes.STRING,
}, {
  sequelize,
  modelName: `Article`,
  tableName: `articles`
});

module.exports = define;
