'use strict';

const { DEPARTMENT_TABLE, DepartmentModel } = require('../models/department.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(DEPARTMENT_TABLE, DepartmentModel);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(DEPARTMENT_TABLE);
  }
};
