module.exports = (app) => {
    const companies = require('./company.controller.js');
    const auth = require('../library/auth.js');

    // Create a new company
    app.post('/companies', auth.optional, companies.create);

    // Retrieve all companies
    app.get('/companies', auth.required, companies.findAll);

    // Retrieve a single company with companyId
    app.get('/companies/:companyId', auth.required, companies.findOne);

    // Update a company with companyId
    app.put('/companies/:companyId', auth.required, companies.update);

    // Delete a company with companyId
    app.delete('/companies/:companyId', auth.required, companies.delete);
}