const mongoose = require('mongoose');

const { Schema } = mongoose;

const AttributesSchema = new Schema({
  name: String,
  type: {
  	type: String,
  	enum: ['text','multiselect','date','list']
  },
  mandatory: { type: Boolean, default: false },
  show_for_user: { type: Boolean, default: false },
  show_for_content: { type: Boolean, default: false },
  show_for_channel: { type: Boolean, default: false },
  show_for_event: { type: Boolean, default: false },
  value: [String]
});

AttributesSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    type: this.type,
    mandatory: this.mandatory,
    show_for_user: this.show_for_user,
    show_for_content: this.show_for_content,
    show_for_channel: this.show_for_channel,
    show_for_event: this.show_for_event,
    value: this.value
  };
};

module.exports = mongoose.model('Attributes', AttributesSchema);