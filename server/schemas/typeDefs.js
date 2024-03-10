const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Score {
    _id: ID
    user: User
    category: String
    score_value: Int
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
    getUserScores(userId: ID!): [Score]
    getCategoryScores(category: String!): [Score]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(id: ID!, username: String, email: String, password: String): User
    deleteUser(id: ID!): User
    addScore(userId: ID!, category: String!, score_value: Int!): Score
  }
`;

module.exports = typeDefs;
