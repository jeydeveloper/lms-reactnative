module.exports = (app) => {
    const auth = require('../library/auth.js');
    const users = require('./user.controller.js');

    // Create a new User
    app.post('/users', auth.optional, users.create);

    // Retrieve all Users
    app.get('/users', auth.required, users.findAll);

    // Retrieve a single User with userId
    app.get('/users/:userId', auth.required, users.findOne);

    // Update a User with userId
    app.put('/users/:userId', auth.required, users.update);

    // Delete a User with userId
    app.delete('/users/:userId', auth.required, users.delete);
}