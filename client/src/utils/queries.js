import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_SCORES = gql`
  query getUserScores($userId: ID!) {
    getUserScores(userId: $userId) {
      _id
      username
      category
      score_value
      createdAt
    }
  }
`;

export const QUERY_CATEGORY_SCORES = gql`
  query getCategoryScores($category: String!) {
    getCategoryScores(category: $category) {
      _id
      username
      category
      score_value
      createdAt
    }
  }
`;

export const ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;


