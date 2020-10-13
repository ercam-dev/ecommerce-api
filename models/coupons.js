'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupons extends Model {
    static associate(models) {
      Coupons.hasMany(models.SalesOrders, {
        foreignKey: 'couponId',
        as: 'SalesOrders'
      });
    }
  };
  Coupons.init({
    code: DataTypes.STRING,
    description: DataTypes.TEXT,
    active: DataTypes.BOOLEAN,
    value: DataTypes.DECIMAL,
    multiple: DataTypes.BOOLEAN,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Coupons',
  });
  return Coupons;
};