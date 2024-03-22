const joi = require('joi');

const name = joi.string();
const status = joi.boolean();

const create = joi.object({
    name: name.required(),
    status
});

const  update = Object.assign({}, create, {});

module.exports = {
    create,
    update
};