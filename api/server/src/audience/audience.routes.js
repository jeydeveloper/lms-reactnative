module.exports = (app) => {
    const audiences = require('./audience.controller.js');
    const auth = require('../library/auth.js');

    // Create a new Audience
    app.post('/audiences', auth.optional, audiences.create);

    // Retrieve all Audiences
    app.get('/audiences', auth.required, audiences.findAll);

    // Retrieve a single Audience with audienceId
    app.get('/audiences/:audienceId', auth.required, audiences.findOne);

    // Update a Audience with audienceId
    app.put('/audiences/:audienceId', auth.required, audiences.update);

    // Delete a Audience with audienceId
    app.delete('/audiences/:audienceId', auth.required, audiences.delete);
}