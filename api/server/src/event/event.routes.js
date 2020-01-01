module.exports = (app) => {
    const events = require('./event.controller.js');
    const auth = require('../library/auth.js');

    // Create a new event
    app.post('/events', auth.optional, events.create);

    // Retrieve all events
    app.get('/events', auth.required, events.findAll);

    // Retrieve a single event with eventId
    app.get('/events/:eventId', auth.required, events.findOne);

    // Update a event with eventId
    app.put('/events/:eventId', auth.required, events.update);

    // Delete a event with eventId
    app.delete('/events/:eventId', auth.required, events.delete);
}