const OwnerController = require('../controllers/ownerController');
const validateSchema = require('../../middleware/validatorHandler');
const router = require('express').Router();
const { createOwner, getOwner, updateOwner, deleteOwner } = require('../schemas/ownerSchema');

const service = new OwnerController();

router.post('/',
    validateSchema(createOwner, 'body'),
    async (req, res, next) => {
        try {
            const owner = await service.create(req.body);
            res.status(201).json({
                statusCode: 201,
                message: 'Owner created successfully!',
                data: owner
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    async (req, res, next) => {
        try {
            const owners = await service.getAll();
            res.status(200).json({
                statusCode: 200,
                message: 'Get all Owners successfully',
                data: owners
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validateSchema(getOwner, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const owner = await service.getById(id);
            res.status(200).json({
                statusCode: 200,
                message: "Get Owner by id successfully",
                data: owner
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validateSchema(getOwner, 'params'),
    validateSchema(updateOwner, 'body'),
    async (req, res, next) => {
        try {
            const owner = await service.update(req.params.id, req.body);
            res.status(200).json({
                statusCode: 200,
                message: "Update owner successfully",
                data: owner
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    // validateSchema(deleteOwner, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(202).json({
                statusCode: 202,
                message: 'Owner deleted successfully',
                data: id
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
