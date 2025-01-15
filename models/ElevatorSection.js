const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  image: {
    type: String, // URL or path to the image
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const cardSectionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  cards: {
    type: [cardSchema],
    required: true,
    validate: {
      validator: function (v) {
        return v.length === 4; // Ensures there are exactly 4 cards
      },
      message: 'There must be exactly 4 cards.',
    },
  },
});

module.exports = mongoose.model('CardSection', cardSectionSchema);
