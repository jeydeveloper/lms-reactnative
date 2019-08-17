const User = require('../user/user.model.js');
const passport = require('passport');

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

    return passport.authenticate('login', { session: false }, (err, passportUser, info) => {
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

//User logout
exports.logout = (req, res, next) => {
    req.logout();
	res.redirect('/');
};

//Retrieve current user
exports.current = (req, res, next) => {
    return User.findById(req.user._id)
        .then((user) => {
          if(!user) {
            return res.sendStatus(400);
          }

          return res.json({ user: user.toAuthJSON() });
        });
};

//Retrieve current user from token
exports.currentfromtoken = (req, res, next) => {
    const { payload: { id } } = req;

    return User.findById(id)
        .then((user) => {
          if(!user) {
            return res.sendStatus(400);
          }

          return res.json({ user: user.toAuthJSON() });
        });
};
