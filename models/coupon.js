'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    static associate(models) {
      Coupon.hasMany(models.SalesOrder, {
        foreignKey: 'couponId',
        as: 'SalesOrder'
      });
    }
  };
  Coupon.init({
    code: DataTypes.STRING,
    description: DataTypes.TEXT,
    active: DataTypes.BOOLEAN,
    value: DataTypes.DECIMAL,
    multiple: DataTypes.BOOLEAN,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Coupon',
  });
  return Coupon;
};