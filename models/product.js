'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.ProductStatus, {
        foreignKey: 'productId',
        as: 'ProductStatus'
      });
      Product.belongsToMany(models.Category, {
        foreignKey: 'productId',
        through: 'ProductCategories',
        as: 'Category'
      });
      Product.belongsToMany(models.Tag, {
        foreignKey: 'productId',
        through: 'ProductTags',
        as: 'Tag'
      });
    }
  };
  Product.init({
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    productStatusId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    regularPrice: DataTypes.DECIMAL,
    discountPrice: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    taxable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};