const setting = require('./setting.model.js');

//Create new setting
exports.create = (req, res, next) => {
    const { body } = req;

    if(!body.title) {
        return res.status(422).json({
          errors: {
            title: 'is required',
          },
        });
    }

    const finalsetting = new setting(body);

    return finalsetting.save()
        .then(() => res.json(finalsetting.toJSON()));
};

// Retrieve all settings from the database.
exports.findAll = (req, res, next) => {
    setting.find()
    .then(settings => {
        res.send(settings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving settings."
        });
    });
};

// Find a single setting with a settingId
exports.findOne = (req, res, next) => {
    setting.findById(req.params.settingId)
    .then(setting => {
        if(!setting) {
            return res.status(404).send({
                message: "setting not found with id " + req.params.settingId
            });            
        }
        res.send(setting);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "setting not found with id " + req.params.settingId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving setting with id " + req.params.settingId
        });
    });
};

// Update a setting
exports.update = (req, res, next) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "setting content can not be empty"
        });
    }

    // Find and update setting with the request body
    setting.findByIdAndUpdate(req.params.settingId, {
        title: req.body.title, 
        image: req.body.image
    }, {new: true})
    .then(setting => {
        if(!setting) {
            return res.status(404).send({
                message: "setting not found with id " + req.params.settingId
            });
        }
        res.send(setting);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "setting not found with id " + req.params.settingId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.settingId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res, next) => {
    setting.findByIdAndRemove(req.params.settingId)
    .then(setting => {
        if(!setting) {
            return res.status(404).send({
                message: "setting not found with id " + req.params.settingId
            });
        }
        res.send({message: "setting deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "setting not found with id " + req.params.settingId
            });                
        }
        return res.status(500).send({
            message: "Could not delete setting with id " + req.params.settingId
        });
    });
};