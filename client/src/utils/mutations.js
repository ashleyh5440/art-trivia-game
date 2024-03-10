import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String, $email: String, $password: String) {
    updateUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      _id
      username
      email
    }
  }
`;

export const ADD_SCORE = gql`
  mutation addScore($userId: ID, $category: String!, $score_value: Int!) {
    addScore(userId: $userId, category: $category, score_value: $score_value) {
      _id
      username
      category
      score_value
      createdAt
    }
  }
`;
