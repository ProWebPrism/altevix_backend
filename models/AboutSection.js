const mongoose = require('mongoose');

// Reusable Section Schema
const SectionSchema = new mongoose.Schema({
  image: {
    type: String, // URL or file path for the image
    required: false, // Optional, as some sections may not have images
  },
  subheading: {
    type: String, // Optional subheading for sections
    required: false,
  },
  description: {
    type: String, // Required for all sections
    required: true,
  },
});

// Main About Section Schema
const AboutSectionSchema = new mongoose.Schema({
  mainBanner: {
    type: String, // URL or file path for the main banner image
    required: true, // Main banner is mandatory
  },
  firstSection: {
    type: SectionSchema, // First section schema with image, subheading, and description
    required: true,
  },
  secondSection: {
    type: SectionSchema, // Second section schema with optional subheading
    required: true,
  },
  thirdSection: {
    type: SectionSchema, // Third section schema with optional subheading
    required: true,
  },
});

// Exporting the Model
const AboutSection = mongoose.model('AboutSection', AboutSectionSchema);

module.exports = AboutSection;
