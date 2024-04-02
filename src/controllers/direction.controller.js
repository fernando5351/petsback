const boom = require('@hapi/boom');
const {models} = require('../../sequelize/index.js');
const {Op} = require('sequelize');

class DirectionController {
    async create(data){
        const direction = await models.Direction.create(data)
        return direction
    }

    async getAll(){
        const direction = await models.Direction.findAll();

        if (direction.length === 0) {
            throw boom.notFound( 'No directions found!' );
        }
        return direction
    }

    async getById(id){
        const direction = await models.Direction.findByPk(id);
        if (!direction) {
            throw boom.notFound(`The direction with ${{id}} doesn't exist!`);
        }
        return direction
    }

    async searchDirection(name){
        const direction = await moodels.Direction.findAll(name,{
            where:{
                description:{
                    [Op.iLike]: `%${name}%`
                }
            }
        });
        if(!direction){
            throw boom.notFound(`Direction with name ${name} not found` )
        }
    }

    async update(id, data) {
        const  direction = await this.getById(id)
        const directionUpdate = await direction.update(data);
        return directionUpdate;
    }

    async delete(id){
        const direction = await this.getById(id)
        await direction.destroy()
    }
}

module.exports = DirectionController