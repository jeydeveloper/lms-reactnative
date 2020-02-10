const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategoriesSchema = new Schema({
  name: String,
  description: String,
  image: String,
  tree: [String],
  parent: String,
  created_at: Date,
  updated_at: Date
},{
	timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

CategoriesSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    description: this.description,
    image: this.image,
    tree: this.tree,
    parent: this.parent,
    created_at: this.created_at,
    updated_at: this.updated_at
  };
};

module.exports = mongoose.model('Categories', CategoriesSchema);