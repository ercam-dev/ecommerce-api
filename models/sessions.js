'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sessions extends Model {
    static associate(models) {
      Sessions.hasMany(models.SalesOrders, {
        foreignKey: 'sessionId',
        as: 'SalesOrders'
      });
    }
  };
  Sessions.init({
    data: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Sessions',
  });
  return Sessions;
};