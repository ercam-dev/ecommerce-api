'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      ProductCategory.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'Category'
      });
      ProductCategory.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'Product'
      });
    }
  };
  ProductCategory.init({
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ProductCategory',
  });
  return ProductCategory;
};