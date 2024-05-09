const joi = require("joi");

const name = joi.string();
const idDepartment = joi.number().positive();

const createDistrict = joi.object({
    name: name.required(),
    idDepartment: idDepartment.required()
});

const updateDistrict = joi.object({
    name,
    idDepartment
});

const searchByName = joi.object({
    name: name.required()
});

module.exports = {
    createDistrict,
    updateDistrict,
    searchByName
}
