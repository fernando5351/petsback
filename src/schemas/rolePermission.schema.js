const joi = require('joi');

const roleId = joi.number().integer().min(1);
const accessName = joi.string().valid('user', 'pets');
const canCreate = joi.boolean().default(false);
const canRead = joi.boolean().default(true);
const canUpdate = joi.boolean().default(false);
const canDelete = joi.boolean().default(false);

const create = joi.object({
    roleId: roleId.required(),
    accessName: accessName.required(),
    canCreate: canCreate.required(),
    canRead: canRead.required(),
    canUpdate: canUpdate.required(),
    canDelete: canDelete.required()
});

const  update = joi.object({
    roleId,
    accessName,
    canCreate,
    canRead,
    canUpdate,
    canDelete
});

module.exports = {
    create,
    update
};