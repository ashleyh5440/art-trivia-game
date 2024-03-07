// models.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  highScores: [Number],
  favoritePaintings: [String],
});

const triviaQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  options: [String],
  imageURL: String,
});

const User = mongoose.model('User', userSchema);
const TriviaQuestion = mongoose.model('TriviaQuestion', triviaQuestionSchema);

module.exports = { User, TriviaQuestion };