'use strict';

const {DIRECTIONS_TABLE,DirectionsModel} = require('../models/direction.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(DIRECTIONS_TABLE, DirectionsModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(DIRECTIONS_TABLE);
  }
};
