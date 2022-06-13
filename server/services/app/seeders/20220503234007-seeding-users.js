'use strict';
const users = require('./users.json');

module.exports = {
  async up (queryInterface, Sequelize) {
  users.forEach(el => {
    delete el.id;
    el.createdAt = new Date();
    el.updatedAt = new Date();
  });
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};