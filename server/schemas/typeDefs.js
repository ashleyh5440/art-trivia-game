const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    scores: [Score]
  }

  type Score {
    _id: ID
    category: String
    score: Int
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
    getUserScores: [Score]
    getCategoryScores(category: String!): [Score]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    deleteUser: User
    addScore(userId: ID!, category: String!, score: Int!) : Score
  }
`;

module.exports = typeDefs;
