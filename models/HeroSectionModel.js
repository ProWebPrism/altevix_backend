const mongoose = require('mongoose');

const CarouselItemSchema = new mongoose.Schema({
  image: {
    type: String, 
    required: true,
  },
  title: {
    type: String, 
    required: true,
    trim: true,
  },
  description: {
    type: String, 
    required: true,
    trim: true,
  },
});

const HeroSectionSchema = new mongoose.Schema({
  carousels: [CarouselItemSchema], 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('HeroSection', HeroSectionSchema);
