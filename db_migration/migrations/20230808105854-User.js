'use strict';

const TABLE_NAME = 'Users';

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

      username: {
        allowNull:false,
        type: Sequelize.STRING,
      },

      email: {
        allowNull:false,
        type: Sequelize.STRING,
        unique: true
      },

      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      role: {
        defaultValue: 'User',
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(TABLE_NAME);
  }
};
