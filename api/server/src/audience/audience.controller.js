const Audience = require('./audience.model.js');

//Create new Audience
exports.create = (req, res, next) => {
    const { body: { audience } } = req;

    if(!audience.name) {
        return res.status(422).json({
          errors: {
            name: 'is required',
          },
        });
    }

    const finalAudience = new Audience(audience);

    return finalAudience.save()
        .then(() => res.json({ audience: finalAudience.toJSON() }));
};

// Retrieve all audiences from the database.
exports.findAll = (req, res, next) => {
    Audience.find()
    .then(audiences => {
        res.send(audiences);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving audiences."
        });
    });
};

// Find a single audience with a audienceId
exports.findOne = (req, res, next) => {
    Audience.findById(req.params.audienceId)
    .then(audience => {
        if(!audience) {
            return res.status(404).send({
                message: "Audience not found with id " + req.params.audienceId
            });            
        }
        res.send(audience);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Audience not found with id " + req.params.audienceId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving audience with id " + req.params.audienceId
        });
    });
};

// Update a audience
exports.update = (req, res, next) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Audience content can not be empty"
        });
    }

    // Find and update audience with the request body
    Audience.findByIdAndUpdate(req.params.audienceId, {
        name: req.body.name, 
        filter: req.body.filter
    }, {new: true})
    .then(audience => {
        if(!audience) {
            return res.status(404).send({
                message: "Audience not found with id " + req.params.audienceId
            });
        }
        res.send(audience);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Audience not found with id " + req.params.audienceId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.audienceId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res, next) => {
    Audience.findByIdAndRemove(req.params.audienceId)
    .then(audience => {
        if(!audience) {
            return res.status(404).send({
                message: "Audience not found with id " + req.params.audienceId
            });
        }
        res.send({message: "Audience deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Audience not found with id " + req.params.audienceId
            });                
        }
        return res.status(500).send({
            message: "Could not delete audience with id " + req.params.audienceId
        });
    });
};