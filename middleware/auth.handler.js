const passport = require("passport");
const Ican = require('./permissionHandler');

function skipAuthentication(req, res, next) {
    const exemptedRoutes = ['/auth/login'];

    if (exemptedRoutes.includes(req.path)) {
        return next();
    }

    const authenticate = passport.authenticate('jwt', { session: false });

    authenticate(req, res, async (error) => {
        if (error) {
            return next(error);
        }

        Ican(req, res, next);
        next();
    });
}

module.exports = skipAuthentication;
