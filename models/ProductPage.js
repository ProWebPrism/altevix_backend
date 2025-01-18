const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
});

const pageUpdateSchema = new mongoose.Schema({
  banner: {
    image: { type: String, required: true }, // URL of the banner image
    subheading: { type: String, required: true }, // Subheading text
    description: { type: String, required: true }, // Description text
  },
  sliderSection: {
    mainTitle: { type: String, required: true }, // Main title for the slider section
    cards: [cardSchema], // Array of cards with title and image
  },
  cardSection: {
    cards: [cardSchema], // Array of 2 cards with title and image
  },
  complimentary: {
    cards: [cardSchema]
  }
}, { timestamps: true });

const PageUpdate = mongoose.model('PageUpdate', pageUpdateSchema);

module.exports = PageUpdate;
