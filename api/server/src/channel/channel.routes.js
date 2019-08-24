module.exports = (app) => {
    const channels = require('./channel.controller.js');
    const auth = require('../library/auth.js');

    // Create a new User
    app.post('/channels', auth.optional, channels.create);

    // Retrieve all Users
    app.get('/channels', auth.required, channels.findAll);

    // Retrieve a single User with channelId
    app.get('/channels/:channelId', auth.required, channels.findOne);

    // Update a User with channelId
    app.put('/channels/:channelId', auth.required, channels.update);

    // Delete a User with channelId
    app.delete('/channels/:channelId', auth.required, channels.delete);
}