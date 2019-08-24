module.exports = (app) => {
    const audiences = require('./audience.controller.js');
    const auth = require('../library/auth.js');

    // Create a new User
    app.post('/audiences', auth.optional, audiences.create);

    // Retrieve all Users
    app.get('/audiences', auth.required, audiences.findAll);

    // Retrieve a single User with audienceId
    app.get('/audiences/:audienceId', auth.required, audiences.findOne);

    // Update a User with audienceId
    app.put('/audiences/:audienceId', auth.required, audiences.update);

    // Delete a User with audienceId
    app.delete('/audiences/:audienceId', auth.required, audiences.delete);
}