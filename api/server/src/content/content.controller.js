const Content = require('./content.model.js');

//Create new Content
exports.create = (req, res, next) => {
    const { body } = req;

    if(!body.title) {
        return res.status(422).json({
          errors: {
            title: 'is required',
          },
        });
    }

    const finalContent = new Content(body);

    return finalContent.save()
        .then(() => res.json(finalContent.toJSON() ))
        .catch(err => {
            if(err.name === 'ValidationError') {
                return res.status(400).send({
                    message: err.message
                });                
            }
            return res.status(500).send({
                message: "Something wrong add content"
            });
        });
};

// Retrieve all contents from the database.
exports.findAll = (req, res, next) => {
    Content.find()
    .then(contents => {
        res.send(contents);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving contents."
        });
    });
};

// Find a single content with a contentId
exports.findOne = (req, res, next) => {
    Content.findById(req.params.contentId)
    .then(content => {
        if(!content) {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });            
        }
        res.send(content);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving content with id " + req.params.contentId
        });
    });
};

// Update a content
exports.update = (req, res, next) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Content content can not be empty"
        });
    }

    // Find and update content with the request body
    Content.findByIdAndUpdate(req.params.contentId, {
        title: req.body.title, 
        description: req.body.description, 
        image: req.body.image, 
        // when_content_complete: req.body.when_content_complete, 
        // modality: req.body.modality, 
        type: req.body.type, 
        source: req.body.source, 
        // recommended_duration: req.body.recommended_duration, 
        // language: req.body.language, 
        // created_and_optimize_for: req.body.created_and_optimize_for, 
        // expertise_level: req.body.expertise_level, 
        // technology_title: req.body.technology_title, 
        // technology_version: req.body.technology_version,
        attribute: req.body.attribute
    }, {new: true, runValidators: true})
    .then(content => {
        if(!content) {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });
        }
        res.send(content);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });                
        }
        if(err.name === 'ValidationError') {
            return res.status(400).send({
                message: err.message
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.contentId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res, next) => {
    Content.findByIdAndRemove(req.params.contentId)
    .then(content => {
        if(!content) {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });
        }
        res.send({message: "Content deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.title === 'NotFound') {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete content with id " + req.params.contentId
        });
    });
};