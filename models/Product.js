const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  advantages: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  productImage: {
    type: String,
    required: true, // URL or path to the product image
  },
  blueprintImages: [
    {
      type: String, // Array to store up to 2 image URLs or paths
    //   validate: [(val) => val.length <= 2, '{PATH} exceeds the limit of 2 blueprints'],
    },
  ],
  applications: {
    type: [String], // Array of strings to list applications
    default: [],
  },
  technicalFeatures: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      features: {
        type: [String], // Array of strings for technical features
        required: true,
      },
    },
  ],
  customisedSolutionCards: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      image: {
        type: String,
        required: true, // URL or path to the image
      },
      subheading: {
        type: String,
        required: true,
        trim: true,
      },
      features: {
        type: [String], // Array of strings for solution card features
        default: [],
      },
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
