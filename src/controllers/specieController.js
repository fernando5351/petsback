const boom = require('@hapi/boom');
const { models } = require('../../sequelize/index.js');
const { Op } = require('sequelize');

class SpecieController {
    
    async create(data) {
        try {
            const specie = await models.Specie.create(data);
            return specie;
        } catch (error) {
            throw boom.badRequest('Error creating specie', error);
        }
    }

    async getAll() {
        const species = await models.Specie.findAll();

        if (species.length === 0) {
            throw boom.notFound('No species found!');
        }
        return species;
    }

    async getById(id) {
        try {
            const specie = await models.Specie.findByPk(id);
            if (!specie) {
                throw boom.notFound(`Specie with id ${id} not found`);
            }
            return specie;
        } catch (error) {
            throw boom.badImplementation('Error retrieving specie', error);
        }
    }

    async update(id, data) {
        try {
            const specie = await this.getById(id);
            await specie.update(data);
            return specie;
        } catch (error) {
            throw boom.badImplementation('Error updating specie', error);
        }
    }

    async delete(id) {
        try {
            const specie = await this.getById(id);
            await specie.destroy();
        } catch (error) {
            throw boom.badImplementation('Error deleting specie', error);
        }
    }

    async searchSpecie(name) {
        try {
            const species = await models.Specie.findAll({
                where: {
                    [Op.or]: [
                        { sexo: { [Op.iLike]: `%${name}%` } },
                        { classification: { [Op.iLike]: `%${name}%` } }
                    ]
                }
            });
            if (species.length === 0) {
                throw boom.notFound(`No species found with name ${name}`);
            }
            return species;
        } catch (error) {
            throw boom.badImplementation(`Error searching species with name ${name}`, error);
        }
    }
}

module.exports = SpecieController;
