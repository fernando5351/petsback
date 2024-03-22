const validateSchema = require('../../middleware/validatorHandler');
const RoleController = require('../controllers/role.controller');
const { create } = require('../schemas/role.schema');
const { params, query } = require('../schemas/validator');
const router = require('express').Router();

const service = new RoleController;

router.post( '/',
    validateSchema(create, 'body'),
    async (req, res, next) => {
        try {
            const role = await service.create(req.body);
            console.log(role);
            res.status(201).json({
                message: 'Role created successfully!',
                data: role
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    validateSchema(query, 'qery'),
    async (req, res, next) => {
        try {
            const { sort, order, limit, offset } = req.query;
            const roles = await service.getAll( sort, order, limit,offset);
            res.status(200).json({
                status: 200,
                message: "satisfactorily obtained resources",
                data: roles
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;