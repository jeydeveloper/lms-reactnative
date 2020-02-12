module.exports = (app) => {
    const assignments = require('./assignment.controller.js');
    const auth = require('../library/auth.js');

    // Create a new assignment
    app.post('/assignments', auth.optional, assignments.create);

    // Retrieve all assignments
    app.get('/assignments', auth.required, assignments.findAll);

    // Retrieve a single assignment with assignmentId
    app.get('/assignments/:assignmentId', auth.required, assignments.findOne);

    // Update a assignment with assignmentId
    app.put('/assignments/:assignmentId', auth.required, assignments.update);

    // Delete a assignment with assignmentId
    app.delete('/assignments/:assignmentId', auth.required, assignments.delete);
}