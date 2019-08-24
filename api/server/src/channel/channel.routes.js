module.exports = (app) => {
    const attributes = require('./attribute.controller.js');
    const auth = require('../library/auth.js');

    // Create a new User
    app.post('/attributes', auth.optional, attributes.create);

    // Retrieve all Users
    app.get('/attributes', auth.required, attributes.findAll);

    // Retrieve a single User with attributeId
    app.get('/attributes/:attributeId', auth.required, attributes.findOne);

    // Update a User with attributeId
    app.put('/attributes/:attributeId', auth.required, attributes.update);

    // Delete a User with attributeId
    app.delete('/attributes/:attributeId', auth.required, attributes.delete);
}