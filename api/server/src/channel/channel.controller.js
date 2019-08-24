const Channel = require('./channel.model.js');

//Create new Channel
exports.create = (req, res, next) => {
    const { body: { channel } } = req;

    if(!channel.title) {
        return res.status(422).json({
          errors: {
            title: 'is required',
          },
        });
    }

    const finalChannel = new Channel(channel);

    return finalChannel.save()
        .then(() => res.json({ channel: finalChannel.toJSON() }))
        .catch(err => {
            if(err.name === 'ValidationError') {
                return res.status(400).send({
                    message: err.message
                });                
            }
            return res.status(500).send({
                message: "Something wrong add channel"
            });
        });
};

// Retrieve all channels from the database.
exports.findAll = (req, res, next) => {
    Channel.find()
    .then(channels => {
        res.send(channels);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving channels."
        });
    });
};

// Find a single channel with a channelId
exports.findOne = (req, res, next) => {
    Channel.findById(req.params.channelId)
    .then(channel => {
        if(!channel) {
            return res.status(404).send({
                message: "Channel not found with id " + req.params.channelId
            });            
        }
        res.send(channel);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Channel not found with id " + req.params.channelId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving channel with id " + req.params.channelId
        });
    });
};

// Update a channel
exports.update = (req, res, next) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Channel content can not be empty"
        });
    }

    // Find and update channel with the request body
    Channel.findByIdAndUpdate(req.params.channelId, {
        title: req.body.title, 
        description: req.body.description, 
        image: req.body.image, 
        subject: req.body.subject, 
        content: req.body.content
    }, {new: true})
    .then(channel => {
        if(!channel) {
            return res.status(404).send({
                message: "Channel not found with id " + req.params.channelId
            });
        }
        res.send(channel);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Channel not found with id " + req.params.channelId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.channelId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res, next) => {
    Channel.findByIdAndRemove(req.params.channelId)
    .then(channel => {
        if(!channel) {
            return res.status(404).send({
                message: "Channel not found with id " + req.params.channelId
            });
        }
        res.send({message: "Channel deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.title === 'NotFound') {
            return res.status(404).send({
                message: "Channel not found with id " + req.params.channelId
            });                
        }
        return res.status(500).send({
            message: "Could not delete channel with id " + req.params.channelId
        });
    });
};