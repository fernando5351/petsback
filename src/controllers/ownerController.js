const boom = require('@hapi/boom');
const { models } = require('../../sequelize/index.js');
const { Op } = require('sequelize')

class OwnerController {
    
    async create(data) {
        try {
            const owner = await models.Owner.create(data);
            return owner;
        } catch (error) {
            throw boom.badRequest('Error creating owner', error);
        }
    }

    async getAll() {
        const owners = await models.Owner.findAll();

        if (owners.length === 0) {
            throw boom.notFound( 'No owners found!' );
        }
        return owners

    }
    async getById(id) {
        try {
            const owner = await models.Owner.findByPk(id);
            if (!owner) {
                throw boom.notFound(`Owner with id ${id} not found`);
            }
            return owner;
        } catch (error) {
            throw boom.badImplementation('Error retrieving owner', error);
        }
    }


    async update(id, data) {
        try {
            const owner = await this.getById(id);
            await owner.update(data);
            return owner;
        } catch (error) {
            throw boom.badImplementation('Error updating owner', error);
        }
    }

    async delete(id) {
        try {
            const owner = await this.getById(id);
            await owner.destroy();
        } catch (error) {
            throw boom.badImplementation('Error deleting owner', error);
        }
    }

 
    async searchOwner(name) {
        try {
            const owners = await models.Owner.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${name}%` } },
                        { lastName: { [Op.iLike]: `%${name}%` } }
                    ]
                }
            });
            if (owners.length === 0) {
                throw boom.notFound(`No owners found with name ${name}`);
            }
            return owners;
        } catch (error) {
            throw boom.badImplementation(`Error searching owners with name ${name}`, error);
        }
    }
}

module.exports = OwnerController;
