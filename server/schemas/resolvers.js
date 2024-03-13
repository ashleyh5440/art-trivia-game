const { User, Score } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      console.log(`Querying for user with ID: ${id}`);
      const user = await User.findById(id).populate('scores');
      console.log(`Found user: `, user);
      return user;
    },

    getAllUsers: async () => {
      return await User.find().populate('scores');
    },
    // getTriviaQuestion: async (_, { id }) => {
    //   return await TriviaQuestion.findById(id);
    // },
    // getAllTriviaQuestions: async () => {
    //   return await TriviaQuestion.find();
    // },

     // Retrieve scores for a specific user
    getUserScores: async (parent, args, context) => {
      console.log(context);
      try {
        if (!context.user) {
          throw new AuthenticationError('Not logged in');
        }
        const scores = await Score.find({ user: context.user._id }).populate('user');
        return scores;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching user scores');
      }
    },
     // Retrieve scores for a specific category
    getCategoryScores: async (_, { category }, context) => {
      try {
        const scores = await Score.find({ category, user: context.user._id }).populate('user');
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

    updateUser: async (_, { username, email, password }, context) => {
      return await User.findByIdAndUpdate(context.user._id, { username, email, password }, { new: true });
    },


    deleteUser: async (_, {  }, context) => {
      return await User.findByIdAndDelete(context.user._id);
    },


    addScore: async (_, { userId, category, score }, context) => {
   if (!context.user) {
      throw new Error('You need to be logged in!');
    }
      const newScore = await Score.create({
        user: context.user._id,
        category,
        score
      });
        
      await User.findOneAndUpdate(
        {_id: context.user._id }, 
        { $push: { scores: newScore._id } },
        { new: true }
              // await Score.create({ user: context.user._id, category, score });
      );
      return newScore;
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