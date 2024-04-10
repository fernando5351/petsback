'use strict';

const {OWNERS_TABLE,OwnersModel} = require('../models/owner.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable(OWNERS_TABLE,OwnersModel);
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable(OWNERS_TABLE);
  }
};
