const DirectionController = require ('../controllers/direction.controller');
const validateSchema = require('../../middleware/validatorHandler');
const router = require('express').Router();
const { createDirection, getDirection, updateDirection, deleteDirection } = require('../schemas/directionSchema');

const service = new DirectionController();

router.post('/',
    validateSchema(createDirection, 'body'),
    async (req, res, next) => {
        try {
            const direction = await service.create(req.body);
            res.status(201).json({
                statusCode: 201,
                message: 'Direction created successfully!',
                data: direction
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    async (req, res, next) => {
        try {
            const directions = await service.getAll();
            res.status(200).json({
                statusCode: 200,
                message: 'Get all Directions successfully',
                data: directions
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validateSchema(getDirection, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const direction = await service.getById(id);
            res.status(200).json({
                statusCode: 200,
                message: "Get Direction by id successfully",
                data: direction
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validateSchema(getDirection, 'params'),
     validateSchema(updateDirection, 'body'),
    async (req, res, next) => {
        try {
            const direction = await service.update(req.params.id, req.body);
            res.status(200).json({
                statusCode: 200,
                message: "Update direction successfully",
                data: direction
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    // validateSchema(deleteDirection, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(202).json({
                statusCode: 202,
                message: 'Direction deleted successfully',
                data: id
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
