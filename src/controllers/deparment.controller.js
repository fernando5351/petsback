const sequelize = require('../../sequelize');
const { models } = require('../../sequelize');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');

class DeparmentController {
    async create(data){
        let transaction;
        try {
            transaction = await sequelize.transaction();
            console.log(data);
            const deparment = await models.Department.create(data, {
                transaction: transaction
            });
            await transaction.commit();
            return deparment;
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
        const option = {
            include: [
                { 
                    model: models.User,
                    as: 'CreatedBy',
                    attributes: {  
                        exclude: [ 'id', 'roleId', 'password', 'otpSecret']
                    }
                },
                'Districts'
            ],
            attributes: { exclude: ['createdBy'] },
        };
    
        if (sort) {
            option.order = [[sort, order || 'asc']];
        } else {
            option.order = [['createdAt', 'asc']];
        }
    
        option.limit = limit || 50;
        option.offset = offset || 0;
    
        const deparments = await models.Department.findAll(option);
    
        if (deparments.length < 1) {
            throw boom.badRequest('Resources not found');
        }
    
        return deparments;
    }

    async searchByName( name ) {
        const deparment = await models.Department.findAll({
            where:{
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            attributes: { exclude: ['createdBy'] },
            include: [
                { 
                    model: models.User,
                    as: 'CreatedBy',
                    attributes: {  
                        exclude: [ 'id', 'roleId', 'password', 'otpSecret']
                    }
                },
                'Districts'
            ]
        });
        if (deparment.length < 1) {
            throw boom.notFound(`The resource ${name} does not exist`);
        }
        return deparment;
    }

    async getById(id) {
        const deparment = await models.Department.findByPk(id, {
            include: [
                { 
                    model: models.User,
                    as: 'CreatedBy',
                    attributes: {  
                        exclude: ['id', 'roleId', 'password', 'otpSecret']
                    }
                },
                'Districts'
            ],
            attributes: { exclude: ['createdBy'] },
        });
        if (!deparment) {
            throw boom.notFound("Resource doesn't exist");
        }
        return deparment;
    }

    async update(id, data){
        let transaction;
        try {
            transaction = await sequelize.transaction();
            let deparment = await this.getById(id);
            const deparmentUpdated = await deparment.update(data, {
                transaction: transaction
            });
            transaction.commit();
            return deparmentUpdated;
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw boom.badRequest(error);
        }
    }

    async delete(id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            let deparment = await this.getById(id);
            const deparmentDeleted = await deparment.destroy({
                transaction: transaction
            });
            transaction.commit();
            return deparmentDeleted;
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw boom.badRequest(error);
        }
    }
    
}

module.exports = DeparmentController;