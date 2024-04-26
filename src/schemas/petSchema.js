const Joi = require('joi');
const name = Joi.string().required();

const petSchema = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string().required(),
    specieId: Joi.number().integer().required(),
    breed: Joi.string().allow('').optional(),
    age: Joi.number().integer().allow(null).optional(),
    directionId: Joi.number().integer().required(),
    ownerId: Joi.number().integer().allow(null).optional(),
    status: Joi.string().valid('available', 'adoptable', 'death', 'healthy').default('available'),
    createdAt: Joi.string(),
    updatedAt: Joi.string()
});

// Esquema de validación para crear una mascota
const createPetSchema = Joi.object({
    name: Joi.string().required(),
    specieId: Joi.number().integer().required(),
    breed: Joi.string().allow('').optional(),
    age: Joi.number().integer().allow(null).optional(),
    directionId: Joi.number().integer().required(),
    ownerId: Joi.number().integer().allow(null).optional(),
    status: Joi.string().valid('available', 'adoptable', 'death', 'healthy').default('available'),
});

// Esquema de validación para actualizar una mascota
const updatePetSchema = Joi.object({
    name: Joi.string(),
    specieId: Joi.number().integer(),
    breed: Joi.string().allow('').optional(),
    age: Joi.number().integer().allow(null).optional(),
    directionId: Joi.number().integer(),
    ownerId: Joi.number().integer().allow(null).optional(),
    status: Joi.string().valid('available', 'adoptable', 'death', 'healthy'),
});

// Esquema de validación para obtener una mascota por ID
const getPetSchema = Joi.object({
    id: Joi.number().integer().required(),
});

searchByName = Joi.object({
    name
})

// Esquema de validación para eliminar una mascota por ID
const deletePetSchema = Joi.object({
    id: Joi.number().integer().required(),
});

module.exports = {
    createPetSchema,
    updatePetSchema,
    getPetSchema,
    deletePetSchema,
    searchByName
};
