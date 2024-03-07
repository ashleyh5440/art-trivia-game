const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one question
router.get('/:id', getQuestion, (req, res) => {
  res.json(res.question);
});

// Create a new question
router.post('/', async (req, res) => {
  const question = new Question({
    question: req.body.question,
    answer: req.body.answer,
    options: req.body.options,
    imageURL: req.body.imageURL
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one question
router.patch('/:id', getQuestion, async (req, res) => {
  if (req.body.question != null) {
    res.question.question = req.body.question;
  }
  if (req.body.answer != null) {
    res.question.answer = req.body.answer;
  }
  if (req.body.options != null) {
    res.question.options = req.body.options;
  }
  if (req.body.imageURL != null) {
    res.question.imageURL = req.body.imageURL;
  }
  try {
    const updatedQuestion = await res.question.save();
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one question
router.delete('/:id', getQuestion, async (req, res) => {
  try {
    await res.question.remove();
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getQuestion(req, res, next) {
  let question;
  try {
    question = await Question.findById(req.params.id);
    if (question == null) {
      return res.status(404).json({ message: 'Question not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.question = question;
  next();
}

module.exports = router;