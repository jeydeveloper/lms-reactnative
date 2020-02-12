const assignment = require('./assignment.model.js');

//Create new assignment
exports.create = (req, res, next) => {
    const { body } = req;

    if(!body.name) {
        return res.status(422).send({
            message: "Name is required"
        });
    }

    const finalassignment = new assignment(body);

    return finalassignment.save()
        .then(() => res.json(finalassignment.toJSON()))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while create data."
            });
        });
};

// Retrieve all assignments from the database.
exports.findAll = (req, res, next) => {
    assignment.find()
    .then(assignments => {
        res.send(assignments);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving assignments."
        });
    });
};

// Find a single assignment with a assignmentId
exports.findOne = (req, res, next) => {
    assignment.findById(req.params.assignmentId)
    .then(assignment => {
        if(!assignment) {
            return res.status(404).send({
                message: "assignment not found with id " + req.params.assignmentId
            });            
        }
        res.send(assignment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "assignment not found with id " + req.params.assignmentId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving assignment with id " + req.params.assignmentId
        });
    });
};

// Update a assignment
exports.update = (req, res, next) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "assignment content can not be empty"
        });
    }

    // Find and update assignment with the request body
    assignment.findByIdAndUpdate(req.params.assignmentId, req.body, {new: true})
    .then(assignment => {
        if(!assignment) {
            return res.status(404).send({
                message: "assignment not found with id " + req.params.assignmentId
            });
        }
        res.send(assignment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "assignment not found with id " + req.params.assignmentId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.assignmentId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res, next) => {
    assignment.findByIdAndRemove(req.params.assignmentId)
    .then(assignment => {
        if(!assignment) {
            return res.status(404).send({
                message: "assignment not found with id " + req.params.assignmentId
            });
        }
        res.send({message: "assignment deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "assignment not found with id " + req.params.assignmentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete assignment with id " + req.params.assignmentId
        });
    });
};