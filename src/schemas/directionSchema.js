
const joi = require('joi')

const id = joi.number().integer()
const description = joi.string();
const street = joi.string();
const colonia = joi.string();
const home = joi.number().integer();
const reference = joi.string();
const createdAt = joi.string();
const updatedAt = joi.string();


const createDirection = joi.object({
    description: description.required(),
    street: street,
    colonia: colonia,
    home: home,
    reference: reference,
})

const  updateDirection = joi.object({
    description: description,
    street: street,
    colonia: colonia,
    home: home,
    reference: reference,
})

const getDirection = joi.object({
    id: id.required()
})

module.exports = {
    createDirection,
    updateDirection,
    getDirection
}

