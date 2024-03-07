const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  options: [
    {
      type: String
    }
  ],
  imageURL: {
    type: String
  }
});

module.exports = mongoose.model('Question', questionSchema);