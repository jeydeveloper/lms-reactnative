const mongoose = require('mongoose');

const { Schema } = mongoose;

const AudiencesSchema = new Schema({
  name: String,
  filter: {
    type: Map,
    of: String
  }
});

AudiencesSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    filter: this.filter
  };
};

module.exports = mongoose.model('Audiences', AudiencesSchema);