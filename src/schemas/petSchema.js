const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().required();
const specieId = Joi.number().integer().required();
const breed = Joi.string().allow('').optional();
const age = Joi.number().integer().allow(null).optional();
const directionId = Joi.number().integer().required();
const ownerId = Joi.number().integer().allow(null).optional();
const status = Joi.string().valid('available', 'adoptable', 'death', 'healthy').default('available');

const createPetSchema = Joi.object({
    name: name.required(),
    specieId: specieId.required(),
    breed: breed.required(),
    age: age.required(),
    directionId: directionId.required(),
    ownerId: ownerId,
    status: status,
    "file": "file"
});

const updatePetSchema = Joi.object({
    name: name,
    specieId: specieId,
    breed: breed,
    age: age,
    directionId: directionId,
    ownerId: ownerId,
    status: status
});

const getPetSchema = Joi.object({
    id: id.required(),
});

const deletePetSchema = Joi.object({
    id: id.required(),
});

const searchByName = Joi.object({
    name: name.required()
})

module.exports = {
    createPetSchema,
    updatePetSchema,
    getPetSchema,
    deletePetSchema,
    searchByName
};
