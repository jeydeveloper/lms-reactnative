const questioner = require('./questioner.model.js');

//Create new questioner
exports.create = (req, res, next) => {
    const { body } = req;

    if(!body.question) {
        return res.status(422).send({
            message: "Question is required"
        });
    }

    const finalquestioner = new questioner(body);

    return finalquestioner.save()
        .then(() => res.json(finalquestioner.toJSON()))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while create data."
            });
        });
};

// Retrieve all questioners from the database.
exports.findAll = (req, res, next) => {
    questioner.find()
    .then(questioners => {
        res.send(questioners);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving questioners."
        });
    });
};

// Find a single questioner with a questionerId
exports.findOne = (req, res, next) => {
    questioner.findById(req.params.questionerId)
    .then(questioner => {
        if(!questioner) {
            return res.status(404).send({
                message: "questioner not found with id " + req.params.questionerId
            });            
        }
        res.send(questioner);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "questioner not found with id " + req.params.questionerId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving questioner with id " + req.params.questionerId
        });
    });
};

// Update a questioner
exports.update = (req, res, next) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "questioner content can not be empty"
        });
    }

    // Find and update questioner with the request body
    questioner.findByIdAndUpdate(req.params.questionerId, req.body, {new: true})
    .then(questioner => {
        if(!questioner) {
            return res.status(404).send({
                message: "questioner not found with id " + req.params.questionerId
            });
        }
        res.send(questioner);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "questioner not found with id " + req.params.questionerId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.questionerId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res, next) => {
    questioner.findByIdAndRemove(req.params.questionerId)
    .then(questioner => {
        if(!questioner) {
            return res.status(404).send({
                message: "questioner not found with id " + req.params.questionerId
            });
        }
        res.send({message: "questioner deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "questioner not found with id " + req.params.questionerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete questioner with id " + req.params.questionerId
        });
    });
};