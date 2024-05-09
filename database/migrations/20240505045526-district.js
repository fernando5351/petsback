'use strict';

const { DISTRICT_TABLE, DistrictModel } = require('../models/district.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(DISTRICT_TABLE, DistrictModel);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(DISTRICT_TABLE);
  }
};
