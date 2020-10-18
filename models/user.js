'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
    static login = async (email, password) => {
      const user = await this.findOne({ where: { email } });
        if (user) {
          const auth = await bcrypt.compare(password, user.password);
          if (auth) {
            return user;
          }
          throw Error('incorrect password');
        }
        throw Error('incorrect email');
    }
  };
  User.init({
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [6, undefined]
      }
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  });

  return User;
};
