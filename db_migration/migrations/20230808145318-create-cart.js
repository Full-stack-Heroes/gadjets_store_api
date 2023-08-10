'use strict';

const TABLE_NAME = 'Cart';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },

      itemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      userId: {
        allowNull: false, 
        type: Sequelize.INTEGER,
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(TABLE_NAME);
  }
};
