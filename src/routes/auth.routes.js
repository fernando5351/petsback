const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const validatorHandler = require('../../middleware/validatorHandler');
const passport = require('passport');
const { login, changePassword, updatePassword, mail } = require('../schemas/auth.schema');

const service = new AuthController;

router.post('/login',
    validatorHandler(login, 'body'),
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user;
            const token = service.sigInToken(user);
            res.status(200).json({
                status: "success",
                message:"User logged in successfully!",
                data: user,
                token
            })
        } catch (error) {
            next(error);
        }
    }
);

router.post('/recovery',
    validatorHandler(mail, 'body'),
    async (req, res, next) => {
        res.send('hola esto es para recuperar tu cuenta')
    }
)

module.exports = router;