const mongoose = require('mongoose');

const { Schema } = mongoose;

const AttributesSchema = new Schema({
  name: String,
  value: [String]
});

AttributesSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    value: this.value
  };
};

module.exports = mongoose.model('Attributes', AttributesSchema);