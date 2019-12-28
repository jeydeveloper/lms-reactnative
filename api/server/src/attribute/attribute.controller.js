const Attribute = require('./attribute.model.js');

//Create new Attribute
exports.create = (req, res, next) => {
    const { body } = req;

    if(!body.name) {
        return res.status(422).json({
          errors: {
            name: 'is required',
          },
        });
    }

    const finalAttribute = new Attribute(body);

    return finalAttribute.save()
        .then(() => res.json(finalAttribute.toJSON()));
};

// Retrieve all attributes from the database.
exports.findAll = (req, res, next) => {
    Attribute.find()
    .then(attributes => {
        res.send(attributes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving attributes."
        });
    });
};

// Find a single attribute with a attributeId
exports.findOne = (req, res, next) => {
    Attribute.findById(req.params.attributeId)
    .then(attribute => {
        if(!attribute) {
            return res.status(404).send({
                message: "Attribute not found with id " + req.params.attributeId
            });            
        }
        res.send(attribute);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Attribute not found with id " + req.params.attributeId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving attribute with id " + req.params.attributeId
        });
    });
};

// Update a attribute
exports.update = (req, res, next) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Attribute content can not be empty"
        });
    }

    // Find and update attribute with the request body
    Attribute.findByIdAndUpdate(req.params.attributeId, {
        name: req.body.name, 
        type: req.body.type, 
        show_for: req.body.show_for, 
        value: req.body.value
    }, {new: true})
    .then(attribute => {
        if(!attribute) {
            return res.status(404).send({
                message: "Attribute not found with id " + req.params.attributeId
            });
        }
        res.send(attribute);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Attribute not found with id " + req.params.attributeId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.attributeId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res, next) => {
    Attribute.findByIdAndRemove(req.params.attributeId)
    .then(attribute => {
        if(!attribute) {
            return res.status(404).send({
                message: "Attribute not found with id " + req.params.attributeId
            });
        }
        res.send({message: "Attribute deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Attribute not found with id " + req.params.attributeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete attribute with id " + req.params.attributeId
        });
    });
};