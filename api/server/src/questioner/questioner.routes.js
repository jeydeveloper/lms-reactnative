module.exports = (app) => {
    const questioners = require('./questioner.controller.js');
    const auth = require('../library/auth.js');

    // Create a new questioner
    app.post('/questioners', auth.optional, questioners.create);

    // Retrieve all questioners
    app.get('/questioners', auth.required, questioners.findAll);

    // Retrieve a single questioner with questionerId
    app.get('/questioners/:questionerId', auth.required, questioners.findOne);

    // Update a questioner with questionerId
    app.put('/questioners/:questionerId', auth.required, questioners.update);

    // Delete a questioner with questionerId
    app.delete('/questioners/:questionerId', auth.required, questioners.delete);
}