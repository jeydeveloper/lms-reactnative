module.exports = (app) => {
    const upload = require('./upload.controller.js');
    const auth = require('../library/auth.js');

    // Create a new Upload
    app.post('/upload', auth.optional, upload.create);
}