const validateSchema = require('../../middleware/validatorHandler');
const codeGenerator = require('../controllers/codeGenerator');
const DepartmentController = require('../controllers/deparment.controller');
const { createDepartment, searchByName, updateDepartment } = require('../schemas/department.schema');
const { params, query } = require('../schemas/validator');
const router = require('express').Router();

const service = new DepartmentController;

router.post( '/',
    validateSchema(createDepartment, 'body'),
    async (req, res, next) => {
        try {
            const user = req.user;
            const { name } = req.body;
            const deparment = await service.create({name, createdBy: user.sub, code: codeGenerator()});
            res.status(201).json({
                statusCode: 201,
                message: 'Department created successfully!',
                data: deparment
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    validateSchema(query, 'query'),
    async (req, res, next) => {
        try {
            const { sort, order, limit, offset } = req.query;
            const deparments = await service.getAll( sort, order, limit,offset);
            res.status(200).json({
                status: 200,
                message: "satisfactorily obtained resources",
                data: deparments
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/search',
    validateSchema(searchByName, 'query'),
    async (req, res, next) => {
        try {
            const { name } = req.query;
            const deparment = await service.searchByName(name);
            res.status(200).json({
                status: 200,
                message: "satisfactorily obtained resources",
                data: deparment
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id', 
    validateSchema(params,'params'),
    async (req,res,next)=> {
        try {
            const deparment = await service.getById(req.params.id);
            res.status(200).json({
                statusCode: 200,
                message: `Resource ${req.params.id} retrieved satisfactory`,
                data: deparment
            })
        } catch (error) {
            next(error)
        }
    }
);

router.patch('/:id',
    validateSchema(params, 'params'),
    validateSchema(updateDepartment, 'body'),
    async  (req, res, next) => {
        try {
            const deparment = await service.update(req.params.id, req.body);
            res.status(200).json({
                statusCode: 200,
                message: 'Resource updated successfully',
                data: deparment
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validateSchema(params,'params'),
    async (req,res,next) => {
        try {
            const deparment = await service.delete(req.params.id);
            res.status(202).json({
                statusCode: 202,
                message:'The resource has been deleted',
                data: deparment
            })
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;