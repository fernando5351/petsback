const UserController = require("../src/controllers/user.controller");
const boom = require('@hapi/boom');
const { exemptedRoutes } = require('./auth.handler');

const service = new UserController;

async function Ican(req, res, next) {
    if (!exemptedRoutes.includes(req.path)) {
        try {
            let path = req.path;
            path = path.split('/');
    
            const method = req.method;
            const payload = req.user;
            console.log(payload);
    
            const user = await service.getById(payload.sub);
            const role = user.Role
    
            for (let i = 0; i < role.Permissions.length; i++) {
                const element = role.Permissions[i];
    
                if (path[2] === 'permissions') {
                    path[1] = 'permissions';
                }
    
                switch (element.accessName === path[1]) {
                    case (method === 'GET'):
                        if (!element.canRead) {
                            throw boom.unauthorized('You do not have authorization to this resource');
                        }
                        return next();
                    case (method === 'POST'):
                        if (!element.canCreate) {
                            throw boom.unauthorized('You do not have authorization to this resource');
                        }
                        return next();
                    case (method === 'PATCH'):
                        if (!element.canUpdate) {
                            throw boom.unauthorized('You do not have authorization to this resource');
                        }
                        return next();
                    case (method === 'DELETE'):
                        if (!element.canDelete) {
                            throw boom.unauthorized('You do not have authorization to this resource');
                        }
                        return next();
                    default:
                        return next();
                }
            }
            return next();
        } catch (error) {
            next(error);
        }
    }
    return next();
}

module.exports = Ican;