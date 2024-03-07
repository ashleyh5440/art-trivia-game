// resolvers.js

const { User, TriviaQuestion } = require('./models');

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      return await User.findById(id);
    },
    getAllUsers: async () => {
      return await User.find();
    },
    getTriviaQuestion: async (_, { id }) => {
      return await TriviaQuestion.findById(id);
    },
    getAllTriviaQuestions: async () => {
      return await TriviaQuestion.find();
    },
  },
  Mutation: {
    createUser: async (_, { username, email }) => {
      return await User.create({ username, email });
    },
    updateUser: async (_, { id, username, email }) => {
      return await User.findByIdAndUpdate(id, { username, email }, { new: true });
    },
    deleteUser: async (_, { id }) => {
      return await User.findByIdAndDelete(id);
    },
    addTriviaQuestion: async (_, { question, answer, options, imageURL }) => {
      return await TriviaQuestion.create({ question, answer, options, imageURL });
    },
    updateTriviaQuestion: async (_, { id, question, answer, options, imageURL }) => {
      return await TriviaQuestion.findByIdAndUpdate(id, { question, answer, options, imageURL }, { new: true });
    },
    deleteTriviaQuestion: async (_, { id }) => {
      return await TriviaQuestion.findByIdAndDelete(id);
    },
  },
};
