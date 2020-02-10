module.exports = (app) => {
    const categories = require('./category.controller.js');
    const auth = require('../library/auth.js');

    // Create a new category
    app.post('/categories', auth.optional, categories.create);

    // Retrieve all categories
    app.get('/categories', auth.required, categories.findAll);

    // Retrieve a single category with categoryId
    app.get('/categories/:categoryId', auth.required, categories.findOne);

    // Update a category with categoryId
    app.put('/categories/:categoryId', auth.required, categories.update);

    // Delete a category with categoryId
    app.delete('/categories/:categoryId', auth.required, categories.delete);
}