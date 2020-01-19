const mongoose = require('mongoose');

const { Schema } = mongoose;

const SettingsSchema = new Schema({
  title: String,
  image: String,
  remember_me_timeout: Number,
  show_error_forget_password: { type: Boolean, default: false },
  show_content_only_on_apps: { type: Boolean, default: false }
});

SettingsSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    image: this.image,
    remember_me_timeout: this.remember_me_timeout,
    show_error_forget_password: this.show_error_forget_password,
    show_content_only_on_apps: this.show_content_only_on_apps
  };
};

module.exports = mongoose.model('Settings', SettingsSchema);