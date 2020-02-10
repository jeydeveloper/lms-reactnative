const mongoose = require('mongoose');

const { Schema } = mongoose;

const CompaniesSchema = new Schema({
  name: String,
  address: String,
  domain: String,
  subcompany: [
  	{
  		name: String,
  		address: String,
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

CompaniesSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    address: this.address,
    domain: this.domain,
    subcompany: this.subcompany,
    created_at: this.created_at,
    updated_at: this.updated_at
  };
};

module.exports = mongoose.model('Companies', CompaniesSchema);