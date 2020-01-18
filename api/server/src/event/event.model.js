const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventsSchema = new Schema({
  title: String,
  description: String,
  short_description: String,
  keynote_speaker: String,
  image: String,
  start_date: Date,
  end_date: Date,
  event_url: String,
  attribute: []
});

EventsSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    description: this.description,
    short_description: this.short_description,
    keynote_speaker: this.keynote_speaker,
    image: this.image,
    start_date: this.start_date,
    end_date: this.end_date,
    event_url: this.event_url,
    attribute: this.attribute
  };
};

module.exports = mongoose.model('Events', EventsSchema);