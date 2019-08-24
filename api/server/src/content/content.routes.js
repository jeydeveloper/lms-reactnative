module.exports = (app) => {
    const contents = require('./content.controller.js');
    const auth = require('../library/auth.js');

    // Create a new Content
    app.post('/contents', auth.optional, contents.create);

    // Retrieve all Contents
    app.get('/contents', auth.required, contents.findAll);

    // Retrieve a single Content with contentId
    app.get('/contents/:contentId', auth.required, contents.findOne);

    // Update a Content with contentId
    app.put('/contents/:contentId', auth.required, contents.update);

    // Delete a Content with contentId
    app.delete('/contents/:contentId', auth.required, contents.delete);
}