const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming you're using MongoDB's ObjectId for user IDs
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  propertyLocation: {
    type: String,
    required: true
  },
  ownerContactAddress: {
    type: String,
    required: true
  },
  ownerContactNumber: {
    type: String,
    required: true
  },
  ownerAlternateContactNumber: {
    type: String,
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  bhk: {
    type: Number,
    required: true
  },
  kitchen: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  imageFilename: {
    type: String,
  },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
