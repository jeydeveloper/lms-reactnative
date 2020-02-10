const company = require('./company.model.js');

//Create new company
exports.create = (req, res, next) => {
    const { body } = req;

    if(!body.name) {
        return res.status(422).send({
            message: "Name is required"
        });
    }

    const finalcompany = new company(body);

    return finalcompany.save()
        .then(() => res.json(finalcompany.toJSON()))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while create data."
            });
        });
};

// Retrieve all companies from the database.
exports.findAll = (req, res, next) => {
    company.find()
    .then(companies => {
        res.send(companies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving companies."
        });
    });
};

// Find a single company with a companyId
exports.findOne = (req, res, next) => {
    company.findById(req.params.companyId)
    .then(company => {
        if(!company) {
            return res.status(404).send({
                message: "company not found with id " + req.params.companyId
            });            
        }
        res.send(company);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "company not found with id " + req.params.companyId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving company with id " + req.params.companyId
        });
    });
};

// Update a company
exports.update = (req, res, next) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "company content can not be empty"
        });
    }

    // Find and update company with the request body
    company.findByIdAndUpdate(req.params.companyId, req.body, {new: true})
    .then(company => {
        if(!company) {
            return res.status(404).send({
                message: "company not found with id " + req.params.companyId
            });
        }
        res.send(company);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "company not found with id " + req.params.companyId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.companyId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res, next) => {
    company.findByIdAndRemove(req.params.companyId)
    .then(company => {
        if(!company) {
            return res.status(404).send({
                message: "company not found with id " + req.params.companyId
            });
        }
        res.send({message: "company deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "company not found with id " + req.params.companyId
            });                
        }
        return res.status(500).send({
            message: "Could not delete company with id " + req.params.companyId
        });
    });
};