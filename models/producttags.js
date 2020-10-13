'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductTags extends Model {
    static associate(models) {
      ProductTags.belongsTo(models.Tags, {
        foreignKey: 'tagId',
        as: 'Tags'
      });
      ProductTags.belongsTo(models.Products, {
        foreignKey: 'productId',
        ad: 'Products'
      });
    }
  };
  ProductTags.init({
    tagId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductTags',
  });
  return ProductTags;
};