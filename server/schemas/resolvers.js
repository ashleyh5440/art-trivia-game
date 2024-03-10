const { User, Score } = require('./models');

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
     // Retrieve scores for a specific user
    getUserScores: async (_, { userId }) => {
      try {
        const scores = await Score.find({ user: userId }).populate('user');
        return scores;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching user scores');
      }
    },
     // Retrieve scores for a specific category
    getCategoryScores: async (_, { category }) => {
      try {
        const scores = await Score.find({ category }).populate('user');
        return scores;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching category scores');
      }
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

module.exports = resolvers;