const validateSchema = require('../../middleware/validatorHandler');
const codeGenerator = require('../controllers/codeGenerator');
const DistrictController = require('../controllers/district.controller');
const { createDistrict, updateDistrict, searchByName } = require('../schemas/district.schema');
const { params, query } = require('../schemas/validator');
const router = require('express').Router();

const service = new DistrictController;

router.post( '/',
    validateSchema(createDistrict, 'body'),
    async (req, res, next) => {
        try {
            const user = req.user;
            const { name, idDepartment } = req.body;
            const district = await service.create({ name, idDepartment, createdBy: user.sub, code: codeGenerator() });
            res.status(201).json({
                statusCode: 201,
                message: 'District created successfully!',
                data: district
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
            const districts = await service.getAll( sort, order, limit,offset);
            res.status(200).json({
                status: 200,
                message: "satisfactorily obtained resources",
                data: districts
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
            const district = await service.searchByName(name);
            res.status(200).json({
                status: 200,
                message: "satisfactorily obtained resources",
                data: district
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
            const district = await service.getById(req.params.id);
            res.status(200).json({
                statusCode: 200,
                message: `Resource ${req.params.id} retrieved satisfactory`,
                data: district
            })
        } catch (error) {
            next(error)
        }
    }
);

router.patch('/:id',
    validateSchema(params, 'params'),
    validateSchema(updateDistrict, 'body'),
    async  (req, res, next) => {
        try {
            const district = await service.update(req.params.id, req.body);
            res.status(200).json({
                statusCode: 200,
                message: 'Resource updated successfully',
                data: district
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
            const district = await service.delete(req.params.id);
            res.status(202).json({
                statusCode: 202,
                message:'The resource has been deleted',
                data: district
            })
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;