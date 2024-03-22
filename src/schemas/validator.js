const joi = require('joi');

const id = joi.number().integer();

module.exports = {
    // The `params` object is used to validate URL parameters.
    params: {
        id: id.required()
            .description('The task identifier')
    },
    // The `query` object is used to validate query strings.
    query: joi.object().keys({
        sort: joi.string()
            .default('createdAt'),
        order: joi.string()
            .default('desc'),
        limit: joi.number()
            .integer()
            .min(1)
            .max(100)
            .default(50),
        offset: joi.number()
            .integer()
            .min(1)
            .default(1)
    })
}