'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.SalesOrders, {
        foreignKey: 'userId',
        as: 'SalesOrders'
      });
      Users.belongsToMany(models.Roles, {
        foreignKey: 'userId',
        through: 'UserRoles',
        as: 'Roles'
      })
    }
  };
  Users.init({
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};