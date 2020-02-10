const category = require('./category.model.js');

//Create new category
exports.create = (req, res, next) => {
    const { body } = req;

    if(!body.name) {
        return res.status(422).send({
            message: "Name is required"
        });
    }

    const finalcategory = new category(body);

    return finalcategory.save()
        .then(() => res.json(finalcategory.toJSON()))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while create data."
            });
        });
};

// Retrieve all categories from the database.
exports.findAll = (req, res, next) => {
    category.find()
    .then(categories => {
        res.send(categories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving categories."
        });
    });
};

// Find a single category with a categoryId
exports.findOne = (req, res, next) => {
    category.findById(req.params.categoryId)
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });            
        }
        res.send(category);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving category with id " + req.params.categoryId
        });
    });
};

// Update a category
exports.update = (req, res, next) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "category content can not be empty"
        });
    }

    // Find and update category with the request body
    category.findByIdAndUpdate(req.params.categoryId, req.body, {new: true})
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });
        }
        res.send(category);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.categoryId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res, next) => {
    category.findByIdAndRemove(req.params.categoryId)
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });
        }
        res.send({message: "category deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Could not delete category with id " + req.params.categoryId
        });
    });
};