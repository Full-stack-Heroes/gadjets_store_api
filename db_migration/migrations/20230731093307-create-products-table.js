'use strict';

const TABLE_NAME = 'products';

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

      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      itemId: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      fullPrice: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      price: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      screen: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      capacity: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      ram: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      year: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(TABLE_NAME);
  }
};
