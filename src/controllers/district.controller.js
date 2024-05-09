const sequelize = require('../../sequelize');
const { models } = require('../../sequelize');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');

class DistrictController {
    async create(data){
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const district = await models.District.create(data, {
                transaction: transaction
            });
            await transaction.commit();
            return district;
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
            include: ['Department']
        };
    
        if (sort) {
            option.order = [[sort, order || 'asc']];
        } else {
            option.order = [['createdAt', 'asc']];
        }
    
        option.limit = limit || 50;
        option.offset = offset || 0;
    
        const district = await models.District.findAll(option);
    
        if (district.length < 1) {
            throw boom.badRequest('Resources not found');
        }
    
        return district;
    }

    async searchByName( name ) {
        const district = await models.District.findAll({
            where:{
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });
        if (district.length < 1) {
            throw boom.notFound(`The resource ${name} does not exist`);
        }
        return district;
    }

    async getById(id) {
        const district = await models.District.findByPk(id, {
            include: ['Department']
        });
        if (!district) {
            throw boom.notFound("Resource doesn't exist");
        }
        return district;
    }

    async update(id, data){
        let transaction;
        try {
            transaction = await sequelize.transaction();
            let district = await this.getById(id);
            const districtUpdated = await district.update(data, {
                transaction: transaction
            });
            transaction.commit();
            return districtUpdated;
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw boom.badRequest(error);
        }
    }

    async delete(id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            let district = await this.getById(id);
            const districtDeleted = await district.destroy({
                transaction: transaction
            });
            transaction.commit();
            return districtDeleted;
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw boom.badRequest(error);
        }
    }
    
}

module.exports = DistrictController;