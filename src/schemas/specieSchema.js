const Joi = require('joi');

const specieSchema = Joi.object({
    id: Joi.number().integer(),
    sexo: Joi.string().valid('male', 'female').required(),
    classification: Joi.string().valid('cat', 'dog').required(),
    createdAt: Joi.string(),
    updatedAt: Joi.string()
});




// Esquema de validación para crear una especie
const createSpecieSchema = Joi.object({
    sexo: Joi.string().valid('male', 'female').required(),
    classification: Joi.string().valid('cat', 'dog').required(),
});

// Esquema de validación para actualizar una especie
const updateSpecieSchema = Joi.object({
    sexo: Joi.string().valid('male', 'female'),
    classification: Joi.string().valid('cat', 'dog'),
});

// Esquema de validación para obtener una especie por ID
const getSpecieSchema = Joi.object({
    id: Joi.number().integer().required(),
});

// Esquema de validación para eliminar una especie por ID
const deleteSpecieSchema = Joi.object({
    id: Joi.number().integer().required(),
});

module.exports = {
    createSpecieSchema,
    updateSpecieSchema,
    getSpecieSchema,
    deleteSpecieSchema,
};
