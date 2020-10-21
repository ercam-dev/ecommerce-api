'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    static associate(models) {
      OrderProduct.belongsTo(models.SalesOrder, {
        foreignKey: 'orderId',
        as: 'SalesOrder'
      });
    }
  };
  OrderProduct.init({
    orderId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'OrderProduct',
  });
  return OrderProduct;
};