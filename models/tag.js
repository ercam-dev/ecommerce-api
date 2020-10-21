'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Product, {
        foreignKey: 'tagId',
        through: 'ProductTags',
        as: 'Product'
      })
    }
  };
  Tag.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};