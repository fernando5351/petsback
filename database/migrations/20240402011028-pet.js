'use strict';

const {PETS_TABLE,PetsModel} = require('../models/pet.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.createTable(PETS_TABLE,PetsModel);
     
  },

  async down (queryInterface, Sequelize) {
   

     await queryInterface.dropTable(PETS_TABLE);
     
  }
};
