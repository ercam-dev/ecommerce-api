'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductStatuses extends Model {
    static associate(models) {
      ProductStatuses.hasMany(models.Products, {
        foreignKey: 'productId',
        as: 'Products'
      })
    }
  };
  ProductStatuses.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductStatuses',
  });
  return ProductStatuses;
};