'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      UserRole.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User'
      });
      UserRole.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'Role'
      });
    }
  };
  UserRole.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};