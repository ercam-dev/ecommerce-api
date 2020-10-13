'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CreditCardTransactions extends Model {
    static associate(models) {
      CreditCardTransactions.belongsTo(models.SalesOrders, {
        foreignKey: 'orderId',
        as: 'SalesOrders'
      });
    }
  };
  CreditCardTransactions.init({
    code: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    transactionDate: DataTypes.DATE,
    processor: DataTypes.STRING,
    processorTransactionId: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    creditCardNumber: DataTypes.STRING,
    creditCardType: DataTypes.STRING,
    response: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CreditCardTransactions',
  });
  return CreditCardTransactions;
};