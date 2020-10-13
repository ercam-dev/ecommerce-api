'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    static associate(models) {
      UserRoles.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'Users'
      });
      UserRoles.belongsTo(models.Roles, {
        foreignKey: 'roleId',
        as: 'Roles'
      });
    }
  };
  UserRoles.init({
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserRoles',
  });
  return UserRoles;
};