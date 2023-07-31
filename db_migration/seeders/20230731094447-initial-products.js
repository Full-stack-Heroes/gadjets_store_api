'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require('../initial_data/products.json');

const TABLE_NAME = 'products';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(TABLE_NAME, 
      data.map((dataItem) => {
        const {id: _, ...actualData } = dataItem;

        return actualData;
      })
    );
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(TABLE_NAME, {
      id: data.map(({ id }) => id)
    });
  }
};
