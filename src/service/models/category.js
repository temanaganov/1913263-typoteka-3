/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Category extends Model {}

const define = (sequelize) => Category.init({
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: `Category`,
  tableName: `categories`
});

module.exports = define;
