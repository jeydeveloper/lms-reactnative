module.exports = (app) => {
    const auth = require('../library/auth.js');
    const auths = require('./auth.controller.js');
    const passport = require('passport');

    app.use(passport.initialize());
	app.use(passport.session());

    // Auth login
    app.post('/auth/login', passport.authenticate('local', {failWithError: true}), auths.current);

    // Auth logout
    app.get('/auth/logout', auth.isLoggedIn, auths.logout);

    // Auth current
    app.get('/auth/current', auth.isLoggedIn, auths.current);

    // Auth current from token
    app.get('/auth/current-from-token', auth.required, auths.currentfromtoken);
}