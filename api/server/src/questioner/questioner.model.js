const mongoose = require('mongoose');

const { Schema } = mongoose;

const QuestionersSchema = new Schema({
  question: String,
  question_type: {
  	type: String,
  	enum: ['single-answer','multiple-answer']
  },
  options: [
  	{
  		text: String,
  		is_answer: { type: Boolean, default: false }
  	}
  ],
  created_at: Date,
  updated_at: Date
},{
	timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

QuestionersSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    question: this.question,
    question_type: this.question_type,
    options: this.options,
    created_at: this.created_at,
    updated_at: this.updated_at
  };
};

module.exports = mongoose.model('Questioners', QuestionersSchema);