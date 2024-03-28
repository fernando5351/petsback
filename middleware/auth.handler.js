const passport = require("passport");
const Ican = require('./permissionHandler')

const exemptedRoutes = ['/auth/login', '/user/register'];

function skipAuthentication(req, res, next) {

    if (exemptedRoutes.includes(req.path)) {
        return next();
    }

    // const authenticate = passport.authenticate('jwt', { session: false });

    // authenticate(req, res, async (error) => {
    //     if (error) {
    //         return next(error);
    //     }

    //     Ican(req, res, next);
    //     return next();
    // });

    return passport.authenticate('jwt', { session: false })(req, res, next);
}

module.exports = {
    exemptedRoutes,
    skipAuthentication
};
