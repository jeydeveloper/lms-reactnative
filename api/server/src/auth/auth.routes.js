module.exports = (app) => {
    const auth = require('../library/auth.js');
    const auths = require('./auth.controller.js');

    function isLoggedIn(request, response, next) {
	    if (request.isAuthenticated()) {
	        return next();
	    }
	    response.redirect('/');
	}

    // Auth login
    app.post('/auth/login', auth.optional, auths.login);

    // Auth logout
    app.get('/auth/logout', auth.required, auths.logout);

    // Auth current
    app.get('/auth/current', isLoggedIn, auths.current);
}