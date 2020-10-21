'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductTag extends Model {
    static associate(models) {
      ProductTag.belongsTo(models.Tag, {
        foreignKey: 'tagId',
        as: 'Tag'
      });
      ProductTag.belongsTo(models.Product, {
        foreignKey: 'productId',
        ad: 'Product'
      });
    }
  };
  ProductTag.init({
    tagId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ProductTag',
  });
  return ProductTag;
};