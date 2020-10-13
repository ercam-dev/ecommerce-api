'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsTo(models.ProductStatuses, {
        foreignKey: 'productId',
        as: 'ProductStatuses'
      });
      Products.belongsToMany(models.Categories, {
        foreignKey: 'productId',
        through: 'ProductCategories',
        as: 'Categories'
      });
      Products.belongsToMany(models.Tags, {
        foreignKey: 'productId',
        through: 'ProductTags',
        as: 'Tags'
      });
    }
  };
  Products.init({
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    productStatusId: DataTypes.INTEGER,
    regularPrice: DataTypes.DECIMAL,
    discountPrice: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    taxable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};