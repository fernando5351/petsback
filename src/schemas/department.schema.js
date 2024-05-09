const joi = require('joi');

const name = joi.string();

const createDepartment = joi.object({
    name: name.required()
});

const updateDepartment = joi.object({
    name
});

const searchByName = joi.object({
    name: name.required()
});

module.exports = {
    createDepartment,
    updateDepartment,
    searchByName
};
