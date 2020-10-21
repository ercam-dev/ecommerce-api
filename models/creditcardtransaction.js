'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CreditCardTransaction extends Model {
    static associate(models) {
      CreditCardTransaction.belongsTo(models.SalesOrder, {
        foreignKey: 'orderId',
        as: 'SalesOrder'
      });
    }
  };
  CreditCardTransaction.init({
    code: DataTypes.STRING,
    orderId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    transactionDate: DataTypes.DATE,
    processor: DataTypes.STRING,
    processorTransactionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    amount: DataTypes.DECIMAL,
    creditCardNumber: DataTypes.STRING,
    creditCardType: DataTypes.STRING,
    response: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CreditCardTransaction',
  });
  return CreditCardTransaction;
};