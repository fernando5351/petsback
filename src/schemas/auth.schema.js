const joi = require('joi');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
//acepta @, $, !, %, *, ? y &.

const password = joi.string()
  .min(8)
  .message('Debe tener letras mayusculas,minusculas, numeros y caracteres especiales como @, $, !, %, *, ? y &')
  .required();
const email = joi.string().email().required();

const login = joi.object({
    email,
    password
});

const mail = joi.object({
    email
});

const changePassword =  joi.object({
    oldPassword : password.required(),
    newPassword : password.regex(passwordPattern),
    repeatNewPassword : password.regex(passwordPattern)
});

const  updatePassword = joi.object({
   password: password.regex(passwordPattern)
});

module.exports = {
    login,
    changePassword,
    mail,
    updatePassword
}