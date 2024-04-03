const SpecieController = require('../controllers/specieController');
const validateSchema = require('../../middleware/validatorHandler');
const router = require('express').Router();
const { createSpecieSchema, getSpecieSchema, updateSpecieSchema, deleteSpecieSchema } = require('../schemas/specieSchema');

const service = new SpecieController();

router.post('/',
    //WvalidateSchema(createSpecieSchema, 'body'),
    async (req, res, next) => {
        try {
            const specie = await service.create(req.body);
            res.status(201).json({
                statusCode: 201,
                message: 'Specie created successfully!',
                data: specie
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    async (req, res, next) => {
        try {
            const species = await service.getAll();
            res.status(200).json({
                statusCode: 200,
                message: 'Get all Species successfully',
                data: species
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validateSchema(getSpecieSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const specie = await service.getById(id);
            res.status(200).json({
                statusCode: 200,
                message: "Get Specie by id successfully",
                data: specie
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validateSchema(getSpecieSchema, 'params'),
    validateSchema(updateSpecieSchema, 'body'),
    async (req, res, next) => {
        try {
            const specie = await service.update(req.params.id, req.body);
            res.status(200).json({
                statusCode: 200,
                message: "Update specie successfully",
                data: specie
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    // validateSchema(deleteSpecie, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(202).json({
                statusCode: 202,
                message: 'Specie deleted successfully',
                data: id
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
