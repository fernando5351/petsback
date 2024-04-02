const boom = require('@hapi/boom');
const { models } = require('../../sequelize/index.js');
const { Op } = require('sequelize');

class PetController {
    async create(data) {
        try {
            const pet = await models.Pet.create(data);
            return pet;
        } catch (error) {
            throw boom.badRequest('Error creating pet', error);
        }
    }

    async getAll() {
        try {
            const pets = await models.Pet.findAll({
                include: [
                    { model: models.Owner, as: 'Owner' },
                    { model: models.Specie, as: 'Specie' },
                    { model: models.Direction, as: 'Direction' }
                ]
            });
            return pets;
        } catch (error) {
            throw boom.badImplementation('Error retrieving pets', error);
        }
    }

    async getById(id) {
        try {
            const pet = await models.Pet.findByPk(id, {
                include: [
                    { model: models.Owner, as: 'Owner' },
                    { model: models.Specie, as: 'Specie' },
                    { model: models.Direction, as: 'Direction' }
                ]
            });
            if (!pet) {
                throw boom.notFound(`Pet with id ${id} not found`);
            }
            return pet;
        } catch (error) {
            throw boom.badImplementation('Error retrieving pet', error);
        }
    }

    async update(id, data) {
        try {
            const pet = await this.getById(id);
            await pet.update(data);
            return pet;
        } catch (error) {
            throw boom.badImplementation('Error updating pet', error);
        }
    }

    async delete(id) {
        try {
            const pet = await this.getById(id);
            await pet.destroy();
        } catch (error) {
            throw boom.badImplementation('Error deleting pet', error);
        }
    }

    async searchPet(name) {
        try {
            const pets = await models.Pet.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                include: [
                    { model: models.Owner, as: 'Owner' },
                    { model: models.Specie, as: 'Specie' },
                    { model: models.Direction, as: 'Direction' }
                ]
            });
            if (pets.length === 0) {
                throw boom.notFound(`No pets found with name ${name}`);
            }
            return pets;
        } catch (error) {
            throw boom.badImplementation(`Error searching pets with name ${name}`, error);
        }
    }
}

module.exports = PetController;
