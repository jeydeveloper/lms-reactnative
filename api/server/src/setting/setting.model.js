const mongoose = require('mongoose');

const { Schema } = mongoose;

const SettingsSchema = new Schema({
  title: String,
  image: String
});

SettingsSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    image: this.image
  };
};

module.exports = mongoose.model('Settings', SettingsSchema);