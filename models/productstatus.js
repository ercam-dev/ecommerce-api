'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductStatus extends Model {
    static associate(models) {
      ProductStatus.hasMany(models.Product, {
        foreignKey: 'productId',
        as: 'Product'
      })
    }
  };
  ProductStatus.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ProductStatus',
  });
  return ProductStatus;
};