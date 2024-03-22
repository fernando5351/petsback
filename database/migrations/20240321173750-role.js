'use strict';

const { ROLE_TABLE, RoleModel } = require('../models/role.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ROLE_TABLE, RoleModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ROLE_TABLE);
  }
};
