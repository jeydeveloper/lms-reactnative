const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = mongoose.model('Users');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  Users.findOne({ email })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
        done(err, user);
    });
});