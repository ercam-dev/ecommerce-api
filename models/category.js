'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Category, {
        foreignKey: 'parentId',
        as: 'Subcategory' 
      });
      Category.belongsToMany(models.Product, {
        foreignKey: 'categoryId',
        through: 'ProductCategories',
        as: 'Product'
      });
    }
  };
  Category.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    parentId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};