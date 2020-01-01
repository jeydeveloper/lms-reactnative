const event = require('./event.model.js');

//Create new event
exports.create = (req, res, next) => {
    const { body } = req;

    if(!body.title) {
        return res.status(422).send({
            message: "Title is required"
        });
    }

    const finalevent = new event(body);

    return finalevent.save()
        .then(() => res.json(finalevent.toJSON()))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while create data."
            });
        });
};

// Retrieve all events from the database.
exports.findAll = (req, res, next) => {
    event.find()
    .then(events => {
        res.send(events);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving events."
        });
    });
};

// Find a single event with a eventId
exports.findOne = (req, res, next) => {
    event.findById(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "event not found with id " + req.params.eventId
            });            
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving event with id " + req.params.eventId
        });
    });
};

// Update a event
exports.update = (req, res, next) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "event content can not be empty"
        });
    }

    // Find and update event with the request body
    event.findByIdAndUpdate(req.params.eventId, {
        title: req.body.title, 
        description: req.body.description, 
        short_description: req.body.short_description, 
        keynote_speaker: req.body.keynote_speaker, 
        image: req.body.image, 
        start_date: req.body.start_date, 
        end_date: req.body.end_date, 
        event_url: req.body.event_url, 
        image: req.body.image,
        attribute: req.body.attribute
    }, {new: true})
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "event not found with id " + req.params.eventId
            });
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.eventId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res, next) => {
    event.findByIdAndRemove(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "event not found with id " + req.params.eventId
            });
        }
        res.send({message: "event deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Could not delete event with id " + req.params.eventId
        });
    });
};