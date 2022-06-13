'use strict';
const ingredients = require('./ingredients.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    ingredients.forEach(el => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Ingredients', ingredients, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ingredients', null, {});
  }
};