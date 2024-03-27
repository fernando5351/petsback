const passport = require("passport");

function skipAuthentication(req, res, next) {
    const exemptedRoutes = ['/auth/login'];

    if (exemptedRoutes.includes(req.path)) {
        return next();
    }

    return passport.authenticate('jwt', { session: false })(req, res, next);
}

module.exports = skipAuthentication;