'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      Session.hasMany(models.SalesOrder, {
        foreignKey: 'sessionId',
        as: 'SalesOrder'
      });
    }
  };
  Session.init({
    data: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};