module.exports = (app) => {
    const auth = require('../library/auth.js');
    const auths = require('./auth.controller.js');

    // Auth login
    app.post('/auth/login', auth.optional, auths.login);

    // Auth logout
    app.get('/auth/logout', auth.required, auths.logout);

    // Auth current
    app.get('/auth/current', auth.required, auths.current);
}