'use strict';

const { USERS_TABLE, UsersModel } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USERS_TABLE, UsersModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USERS_TABLE);
  }
};
