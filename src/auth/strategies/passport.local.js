const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const AuthController = require('../../controllers/auth.controller');
const bcrypt = require('bcrypt');
const configuration = require('../../../config');
const EmailController = require('../../mail/controller/mailer.controller');
const fs = require('fs')
const path = require('path');
const bodyHtml = fs.readFileSync(path.join(__dirname, '../../mail/html/mail.html'), 'utf-8');

const service = new AuthController;
const mailerService = new EmailController;

const localStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {
    const user = await service.getByEmail(email);

    if(!user){
        return done(boom.unauthorized('invalid data'), false);
    }

    if (user.dataValues.otpSecret != null) {
        if (user.dataValues.otpSecret !== password) {
            return done(boom.unauthorized('Unauthorized, data invalid'), null);
        }
        var token = service.recoveryToken(user.dataValues);
        var url = configuration.recoveryView;

        var html = bodyHtml.replace('{{message}}', 'Bienvenido a pets, podrás stablecer tu contraseña personal haciendo click en el boton:');
        html = html.replace('{{url}}', url);
        html = html.replace('{{token}}', token);
        html = html.replace('{{alert}}', 'Ten en cuenta que este enlace solo dura 2 horas, luego de eso tendrás que solicitar uno nuevo');
        await mailerService.sendMail(user.dataValues, 'Establecer contraseña', html);
        await user.update({ status: false });
        return done(null, { message: 'Mail send', statusCode: 423, user });
    } else {
        const isMatch = await bcrypt.compare(password, user.dataValues.password);
        if (!isMatch) {
            return done(boom.unauthorized('Invalid credentials, User or password'), false);
        } 
    } 
    delete user.dataValues.password;
    return done(null, user);
});

module.exports = localStrategy