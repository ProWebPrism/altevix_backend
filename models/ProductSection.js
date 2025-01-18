const mongoose = require('mongoose');

// Card Sub-Schema
const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// Section Schema (with embedded CardSchema)
const SectionSchema = new mongoose.Schema({
  cards: [CardSchema], // Embedding CardSchema as an array
});

// Model
const Section = mongoose.model('ProductSection', SectionSchema);

// Export Model
module.exports = Section;
