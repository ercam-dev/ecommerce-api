'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategories extends Model {
    static associate(models) {
      ProductCategories.belongsTo(models.Categories, {
        foreignKey: 'categoryId',
        as: 'Categories'
      });
      ProductCategories.belongsTo(models.Products, {
        foreignKey: 'productId',
        as: 'Products'
      });
    }
  };
  ProductCategories.init({
    categoryId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductCategories',
  });
  return ProductCategories;
};