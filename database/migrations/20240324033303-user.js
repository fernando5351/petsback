'use strict';

const { USERS_TABLE, UsersModel } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USERS_TABLE, UsersModel);
    //insert user
    await queryInterface.bulkInsert(USERS_TABLE, [{
      password: '$2b$10$d3El6b/CIOYSeYM1Qgg/SuzqaFxoGA38MjSYzrmDalF9DKtijiO.q', //Papaya@123
      email: 'isaacfernandofernandez5351@gmail.com',
      name: 'Isaac Fernando',
      lastname: 'Fernandez Bailon',
      roleId: 1,
      status: true,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
    }])
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USERS_TABLE);
  }
};
