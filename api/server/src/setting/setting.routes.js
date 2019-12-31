module.exports = (app) => {
    const settings = require('./setting.controller.js');
    const auth = require('../library/auth.js');

    // Create a new Setting
    app.post('/settings', auth.optional, settings.create);

    // Retrieve all Settings
    app.get('/settings', auth.required, settings.findAll);

    // Retrieve a single Setting with settingId
    app.get('/settings/:settingId', auth.required, settings.findOne);

    // Update a Setting with settingId
    app.put('/settings/:settingId', auth.required, settings.update);

    // Delete a Setting with settingId
    app.delete('/settings/:settingId', auth.required, settings.delete);
}