const router = require('express').Router();
const skipAuthentication = require('../../middleware/auth.handler.js')
const Ican = require('../../middleware/permissionHandler.js')
const roleRouter = require('./role.routes.js')
const rolePermissionRouter = require('./rolePermission.routes.js');
const userRouter = require('./user.routes.js');
const authRouter = require('./auth.routes.js');

function routesHandler(app) {
    //fix bug
    app.use('/api/v1', skipAuthentication, router);
    router.use('/role/permissions', rolePermissionRouter);
    router.use('/role', roleRouter);
    router.use('/user', userRouter);
    router.use('/auth', authRouter);
}

module.exports = routesHandler;