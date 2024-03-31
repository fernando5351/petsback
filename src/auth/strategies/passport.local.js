const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const AuthController = require('../../controllers/auth.controller');
const bcrypt = require('bcrypt');

const service = new AuthController;

const localStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {
    const user = await service.getByEmail(email);
    if(!user){
        return done(boom.unauthorized('Invalid credentials, User or password'), null);
    }
    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch) {
        return done(boom.unauthorized('Invalid credentials, User or password'), false);
    }  
    delete user.dataValues.password;
    return done(null, user);
});

module.exports = localStrategy