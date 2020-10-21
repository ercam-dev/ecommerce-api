'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesOrder extends Model {
    static associate(models) {
      SalesOrder.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User'
      });
      SalesOrder.belongsTo(models.Coupon, {
        foreignKey: 'couponId',
        as: 'Coupon'
      });
      SalesOrder.belongsTo(models.Session, {
        foreignKey: 'sessionId',
        as: 'Session'
      });
      SalesOrder.hasMany(models.CreditCardTransaction, {
        foreignKey: 'orderId',
        as: 'CreditCardTransaction'
      });
      SalesOrder.hasMany(models.OrderProduct, {
        foreignKey: 'orderId',
        as: 'OrderProduct'
      });
    }
  };
  SalesOrder.init({
    orderDate: DataTypes.DATE,
    total: DataTypes.DECIMAL,
    couponId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    sessionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'SalesOrder',
  });
  return SalesOrder;
};