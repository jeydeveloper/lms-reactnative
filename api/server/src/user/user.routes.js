module.exports = (app) => {
    const users = require('./user.controller.js');

    // Create a new Product
    app.post('/users', users.create);

    // Retrieve all Products
    app.get('/users', users.findAll);

    // Retrieve a single Product with userId
    app.get('/users/:userId', users.findOne);

    // Update a Note with userId
    app.put('/users/:userId', users.update);

    // Delete a Note with userId
    app.delete('/users/:userId', users.delete);
}