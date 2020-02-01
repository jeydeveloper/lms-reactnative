const User = require('./user.model.js');

//Create new User
exports.create = (req, res, next) => {
    const { body } = req;

    if (!body.email) {
        return res.status(422).send({
            message: "Email is required"
        });
    }

    if (!body.password) {
        return res.status(422).send({
            message: "Password is required"
        });
    }

    const finalUser = new User(body);

    finalUser.setPassword(body.password);

    return finalUser.save()
        .then(() => res.json(finalUser.toAuthJSON()))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while create data."
            });
        });
};

// Retrieve all users from the database.
exports.findAll = (req, res, next) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving users."
            });
        });
};

// Find a single user with a userId
exports.findOne = (req, res, next) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving user with id " + req.params.userId
            });
        });
};

// Update a user
exports.update = (req, res, next) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    let data = {
        fullname: req.body.fullname,
        username: req.body.username,
        roles: req.body.roles,
        status: req.body.status,
        email: req.body.email,
        attribute: req.body.attribute
    }

    if (req.body.password) {
        const finalUser = new User(req.body);
        finalUser.setPassword(req.body.password);
        const password = finalUser.getPassword();
        data = { ...data, salt: password.salt, hash: password.hash };
    }

    // Find and update user with the request body
    User.findByIdAndUpdate(req.params.userId, data, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.userId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res, next) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
};