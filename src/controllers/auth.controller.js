const boom = require('@hapi/boom');
const { models } = require('../../sequelize');
const jwt = require('jsonwebtoken');
const { Jwt } = require('../../config')

class Auth {
    async getByEmail(email) {
        const user = await models.User.findOne({
            where: {
                email
            }
        });
        return user;
    }

    sigInToken(user) {
        const payload = {
            sub: user.id,
            rol: user.roleId,
            status: user.status
        }
        const token = jwt.sign(payload, Jwt.secret, { expiresIn: '7d' })
        return token;
    }

    async sendMail(user, html){

    }

}

module.exports = Auth