const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChannelsSchema = new Schema({
  title: String,
  description: String,
  image: String,
  subject: [String],
  content: [{
  	type: Schema.Types.ObjectId, 
  	ref: 'Contents'
  }]
});

ChannelsSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    description: this.description, 
    image: this.image, 
    subject: this.subject, 
    content: this.content
  };
};

module.exports = mongoose.model('Channels', ChannelsSchema);