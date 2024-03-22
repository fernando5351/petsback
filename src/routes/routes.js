const router = require('express').Router();
const roleRouter = require('./role.routes.js')

function routesHandler(app) {
    app.use('/api/v1', router);
    router.use('/role', roleRouter)
}

module.exports = routesHandler;