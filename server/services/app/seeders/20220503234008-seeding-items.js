'use strict';
const items = require('./items.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    items.forEach(el => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Items', items, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  }
};