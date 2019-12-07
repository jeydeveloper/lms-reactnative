const User = require('../user/user.model.js');
const passport = require('passport');

//User logout
exports.logout = (req, res, next) => {
    req.logout();
	res.redirect('/');
};

//Retrieve current user
exports.current = (req, res, next) => {
    return res.json(req.user.toAuthJSON());
};

//Retrieve current user from token
exports.currentfromtoken = (req, res, next) => {
    const { payload: { id } } = req;

    return User.findById(id)
        .then((user) => {
          if(!user) {
            return res.sendStatus(400);
          }

          return res.json(user.toAuthJSON());
        });
};
