const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const lastName = Joi.string();
const dui = Joi.string();
const phoneCod = Joi.number().integer();
const phone = Joi.string();
const createdAt = Joi.string();
const updatedAt = Joi.string();

const createOwner = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    dui: dui.required(),
    phoneCod: phoneCod.required(),
    phone: phone.required()
});

const updateOwner = Joi.object({
    name: name,
    lastName: lastName,
    dui: dui,
    phoneCod: phoneCod,
    phone: phone
});

const getOwner = Joi.object({
    id: id.required()
});

module.exports = {
    createOwner,
    updateOwner,
    getOwner
};
