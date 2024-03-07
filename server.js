const express = require('express');
const { ApolloServer } = require('@apollo/server');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { typeDefs, resolvers } = require('./schemas.js');
const userRoutes = require('./sever/routes/userRoutes.js');
const questionRoutes = require('./sever/routes/questionRoutes.js');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/api/users', userRoutes);
  app.use('/api/questions', questionRoutes);

  app.use('/graphql', server.createHandler());

  // Establish database connection
  const MONGODB_URI = process.env.MONGODB_URI;
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
      // Start the server once the database connection is established
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
};

startApolloServer();