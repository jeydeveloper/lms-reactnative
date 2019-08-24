const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContentsSchema = new Schema({
  title: String,
  description: String,
  image: String,
  when_content_complete: {
  	type: String,
  	enum: ['Opened','Completed']
  },
  modality: {
  	type: String,
  	enum: ['Watch','Read','Listen','Practice']
  },
  type: {
  	type: String,
  	enum: ['Audio Summary','Book','Book Summary','Course','Document','HTMLResource','Podcast','Presentation','Video']
  },
  source: String,
  recommended_duration: {
  	type: { 
  		hour: {
  			type: Number,
  			default: 0
  		}, 
  		minute: {
  			type: Number,
  			default: 0
  		}, 
  		second: {
  			type: Number,
  			default: 0
  		} 
  	},
	default: {}
  },
  language: {
  	type: String,
  	enum: ['English','Bahasa']
  },
  created_and_optimize_for: {
  	type: String,
  	enum: ['Desktop Only','Desktop,Tablet','Desktop,Tablet,Mobile']
  },
  expertise_level: {
  	type: String,
  	enum: ['Everyone','Beginner','Intermediate','Expert']
  },
  technology_title: String,
  technology_version: String
});

ContentsSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    description: this.description,
    image: this.image,
    when_content_complete: this.when_content_complete,
    modality: this.modality,
    type: this.type,
    source: this.source,
    recommended_duration: this.recommended_duration,
    language: this.language,
    created_and_optimize_for: this.created_and_optimize_for,
    expertise_level: this.expertise_level,
    technology_title: this.technology_title,
    technology_version: this.technology_version
  };
};

module.exports = mongoose.model('Contents', ContentsSchema);