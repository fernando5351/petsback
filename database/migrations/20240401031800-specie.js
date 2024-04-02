'use strict';

const {SPECIES_TABLE,SpeciesModel} = require('../models/specie.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(SPECIES_TABLE,SpeciesModel);
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.dropTable(SPECIES_TABLE);
     
  }
};
