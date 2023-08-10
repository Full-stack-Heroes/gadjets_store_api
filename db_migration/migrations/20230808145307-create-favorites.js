'use strict';

const TABLE_NAME = 'FavoriteItems';

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
