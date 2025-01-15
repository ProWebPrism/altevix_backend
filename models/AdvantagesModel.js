const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
});

const sectionSchema = new mongoose.Schema({
  cards: {
    type: [cardSchema],
    validate: {
      validator: function (cards) {
        return cards.length === 8; // Ensure there are exactly 8 cards
      },
      message: 'The section must contain exactly 8 cards.',
    },
  },
});

const Section = mongoose.model('Advantages', sectionSchema);

module.exports = Section;
