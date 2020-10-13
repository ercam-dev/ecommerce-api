'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SalesOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderDate: {
        type: Sequelize.DATE
      },
      total: {
        type: Sequelize.DECIMAL
      },
      couponId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Coupons',
          key: 'id'
        }
      },
      sessionId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Sessions',
          key: 'id'
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SalesOrders');
  }
};