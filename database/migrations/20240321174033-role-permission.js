'use strict';

const { ROLE_PERMISSION_TABLE, RolePermissionModel } = require('../models/rolePermission.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ROLE_PERMISSION_TABLE, RolePermissionModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ROLE_PERMISSION_TABLE);
  }
};
