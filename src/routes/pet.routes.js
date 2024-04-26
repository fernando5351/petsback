const PetController = require('../controllers/pet.controller');
const validateSchema = require('../../middleware/validatorHandler');
const router = require('express').Router();
const { createPetSchema, getPetSchema, updatePetSchema, deletePetSchema } = require('../schemas/petSchema');

const service = new PetController();

router.post('/',
    validateSchema(createPetSchema, 'body'),
    async (req, res, next) => {
        try {
            const pet = await service.create(req.body);
            res.status(201).json({
                statusCode: 201,
                message: 'Pet created successfully!',
                data: pet
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    async (req, res, next) => {
        try {
            const pets = await service.getAll();
            res.status(200).json({
                statusCode: 200,
                message: 'Get all Pets successfully',
                data: pets
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validateSchema(getPetSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const pet = await service.getById(id);
            res.status(200).json({
                statusCode: 200,
                message: 'Get Pet by id successfully',
                data: pet
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/search/:name',
    validateSchema(searchByName, 'params'),
    async (req, res, next) => {
        let { name } = req.params;
    }
)

router.patch('/:id',
    validateSchema(getPetSchema, 'params'),
    validateSchema(updatePetSchema, 'body'),
    async (req, res, next) => {
        try {
            const pet = await service.update(req.params.id, req.body);
            res.status(200).json({
                statusCode: 200,
                message: 'Update pet successfully',
                data: pet
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validateSchema(deletePetSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(202).json({
                statusCode: 202,
                message: 'Pet deleted successfully',
                data: id
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
