'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesOrders extends Model {
    static associate(models) {
      SalesOrders.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'Users'
      });
      SalesOrders.belongsTo(models.Coupons, {
        foreignKey: 'couponId',
        as: 'Coupons'
      });
      SalesOrders.belongsTo(models.Sessions, {
        foreignKey: 'sessionId',
        as: 'Sessions'
      });
      SalesOrders.hasMany(models.CreditCardTransactions, {
        foreignKey: 'orderId',
        as: 'CreditCardTransactions'
      });
      SalesOrders.hasMany(models.OrderProducts, {
        foreignKey: 'orderId',
        as: 'OrderProducts'
      });
    }
  };
  SalesOrders.init({
    orderDate: DataTypes.DATE,
    total: DataTypes.DECIMAL,
    couponId: DataTypes.INTEGER,
    sessionId: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SalesOrders',
  });
  return SalesOrders;
};