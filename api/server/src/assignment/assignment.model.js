const mongoose = require('mongoose');

const { Schema } = mongoose;

const AssignmentsSchema = new Schema({
  name: String,
  start_date: Date,
  end_date: Date,
  audiences: {
    user: [{
        type: Schema.Types.ObjectId, 
        ref: 'Users'
    }],
    audience: [{
        type: Schema.Types.ObjectId, 
        ref: 'Audiences'
    }]
  },
  rules: {
    content: [{
        type: Schema.Types.ObjectId, 
        ref: 'Contents'
    }],
    channel: [{
        type: Schema.Types.ObjectId, 
        ref: 'Channels'
    }]
  },
  created_at: Date,
  updated_at: Date
},{
	timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

AssignmentsSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    start_date: this.start_date,
    end_date: this.end_date,
    audiences: this.audiences,
    rules: this.rules,
    created_at: this.created_at,
    updated_at: this.updated_at
  };
};

module.exports = mongoose.model('Assignments', AssignmentsSchema);