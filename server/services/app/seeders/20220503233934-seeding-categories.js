'use strict';
const categories = require('./categories.json');

module.exports = {
  async up (queryInterface, Sequelize) {
  categories.forEach(el => {
    delete el.id;
    el.createdAt = new Date();
    el.updatedAt = new Date();
  });
    await queryInterface.bulkInsert('Categories', categories, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
