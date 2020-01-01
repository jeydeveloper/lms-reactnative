const mongoose = require('mongoose');

const { Schema } = mongoose;

const AttributesSchema = new Schema({
  name: String,
  type: {
  	type: String,
  	enum: ['text','multiselect','date','list']
  },
  show_for: {
  	type: String,
  	enum: ['user','content','channel','event']
  },
  value: [String]
});

AttributesSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    type: this.type,
    show_for: this.show_for,
    value: this.value
  };
};

module.exports = mongoose.model('Attributes', AttributesSchema);