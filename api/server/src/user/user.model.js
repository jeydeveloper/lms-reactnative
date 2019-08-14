const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);