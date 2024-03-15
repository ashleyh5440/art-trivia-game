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
  query getUserScores {
    getUserScores {
      _id
      user {
        username
      }
      category
      score
      createdAt
    }
  }
`;

export const QUERY_CATEGORY_SCORES = gql`
  query getCategoryScores($category: String!) {
    getCategoryScores(category: $category) {
      _id
      user {
        username
      }
      category
      score
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


