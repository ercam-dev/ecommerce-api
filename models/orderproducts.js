'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProducts extends Model {
    static associate(models) {
      OrderProducts.belongsTo(models.SalesOrders, {
        foreignKey: 'orderId',
        as: 'SalesOrders'
      });
    }
  };
  OrderProducts.init({
    orderId: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'OrderProducts',
  });
  return OrderProducts;
};