const { User, Score } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      return await User.findById(id);
    },
    getAllUsers: async () => {
      return await User.find();
    },
    // getTriviaQuestion: async (_, { id }) => {
    //   return await TriviaQuestion.findById(id);
    // },
    // getAllTriviaQuestions: async () => {
    //   return await TriviaQuestion.find();
    // },
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
    me: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('scores')
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
        // createUser: async (_, { username, email }) => {
    //   return await User.create({ username, email });
    // },
    updateUser: async (_, { id, username, email, password }) => {
      return await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
    },
    deleteUser: async (_, { id }) => {
      return await User.findByIdAndDelete(id);
    },
    addScore: async (_, { userId, category, score_value }) => {
      return await Score.create({ user: userId, category, score_value });
    },
    // addTriviaQuestion: async (_, { question, answer, options, imageURL }) => {
    //   return await TriviaQuestion.create({ question, answer, options, imageURL });
    // },
    // updateTriviaQuestion: async (_, { id, question, answer, options, imageURL }) => {
    //   return await TriviaQuestion.findByIdAndUpdate(id, { question, answer, options, imageURL }, { new: true });
    // },
    // deleteTriviaQuestion: async (_, { id }) => {
    //   return await TriviaQuestion.findByIdAndDelete(id);
    // },
  },
};

module.exports = resolvers;