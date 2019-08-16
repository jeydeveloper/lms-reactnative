module.exports = (app) => {
    const auth = require('../library/auth.js');
    const users = require('./user.controller.js');

    // User login
    app.post('/login', auth.optional, users.login);

    // Create a new User
    app.post('/users', auth.optional, users.create);

    // Retrieve all Users
    app.get('/users', auth.required, users.findAll);

    // Retrieve all Users
    app.get('/current', auth.required, users.current);

    // Retrieve a single User with userId
    app.get('/users/:userId', auth.required, users.findOne);

    // Update a User with userId
    app.put('/users/:userId', auth.required, users.update);

    // Delete a User with userId
    app.delete('/users/:userId', auth.required, users.delete);
}