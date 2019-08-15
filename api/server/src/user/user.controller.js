const User = require('./user.model.js');
const passport = require('passport');
const auth = require('../auth/auth.routes.js');

//User login
exports.login = (req, res, next) => {
    const { body: { user } } = req;

    if(!user.email) {
        return res.status(422).json({
          errors: {
            email: 'is required',
          },
        });
    }

    if(!user.password) {
        return res.status(422).json({
          errors: {
            password: 'is required',
          },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
          return next(err);
        }

        if(passportUser) {
          const user = passportUser;
          user.token = passportUser.generateJWT();

          return res.json({ user: user.toAuthJSON() });
        }

        return res.status(422).json(info);
    }) (req, res, next);
};

//Retrieve current user
exports.current = (req, res, next) => {
    const { payload: { id } } = req;

    return User.findById(id)
        .then((user) => {
          if(!user) {
            return res.sendStatus(400);
          }

          return res.json({ user: user.toAuthJSON() });
        });
};

//Create new User
exports.create = (req, res, next) => {
    const { body: { user } } = req;

    if(!user.email) {
        return res.status(422).json({
          errors: {
            email: 'is required',
          },
        });
    }

    if(!user.password) {
        return res.status(422).json({
          errors: {
            password: 'is required',
          },
        });
    }

    const finalUser = new User(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
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
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
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
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find and update user with the request body
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name || "No user name", 
        email: req.body.email
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
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
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};