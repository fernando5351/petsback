const sequelize = require('../../sequelize');
const { models } = require('../../sequelize');
const boom = require('@hapi/boom');

class RoleController {
    async create(role){
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const newRole = await models.Role.create(role, {
                transaction: transaction
            });
            await transaction.commit();
            return newRole;
        } catch (error) {
            if (transaction) await transaction.rollback();
            if (error.errors && error.errors.length > 0) {
                const errorMessage = error.errors[0].message;
                throw boom.badRequest(errorMessage);
            } else {
                throw boom.badRequest(error);
            }
        }
    }

    async getAll(sort, order, limit, offset) {
        const option = {};
    
        if (sort) {
            option.order = [[sort, order || 'asc']];
        } else {
            option.order = [['createdAt', 'asc']];
        }
    
        option.limit = limit || 50;
        option.offset = offset || 0;
    
        console.log(option);
    
        const roles = await models.Role.findAll(option);
    
        if (roles.length < 1) {
            throw boom.badRequest('Resources not found');
        }
    
        return roles;
    }
    
}

module.exports = RoleController;