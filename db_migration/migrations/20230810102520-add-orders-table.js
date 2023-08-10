'use strict';

const TABLE_NAME = 'Orders';

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
      
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'In Progress',
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },

      items: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.JSONB),
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
