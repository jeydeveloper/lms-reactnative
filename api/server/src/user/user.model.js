const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  fullname: String,
  username: String,
  status: String,
  email: String,
  attribute: [],
  roles: [Number],
  pic: String,
  occupation: String,
  companyName: String,
  phone: String,
  address: {
    addressLine: String,
    city: String,
    state: String,
    postCode: Number
  },
  socialNetworks: {
    linkedIn: String,
    facebook: String,
    twitter: String,
    instagram: String
  },
  hash: String,
  salt: String,
  created_at: Date,
  updated_at: Date
}, 
{
  timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
  }
});

UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    fullname: this.fullname,
    username: this.loginname,
    roles: this.roles,
    status: this.status,
    attribute: this.attribute,
    email: this.email,
    token: this.generateJWT(),
  };
};

UsersSchema.methods.getPassword = function() {
  return {
    salt: this.salt,
    hash: this.hash,
  };
};

module.exports = mongoose.model('Users', UsersSchema);