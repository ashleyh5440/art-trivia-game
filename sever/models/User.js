const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  highScores: [
    {
      type: Object // Define the structure of highScores as needed
    }
  ],
  favoritePaintings: [
    {
      type: String // Assuming favoritePaintings store IDs of paintings
    }
  ]
});

module.exports = mongoose.model('User', userSchema);