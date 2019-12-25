const mongoose = require('mongoose');

const { Schema } = mongoose;

const AudiencesSchema = new Schema({
  name: String,
  type: {
    type: String,
    enum: ['attribute','individual']
  },
  value: []
});

AudiencesSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    type: this.type,
    value: this.value
  };
};

module.exports = mongoose.model('Audiences', AudiencesSchema);