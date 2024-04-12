import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Query {
    posts {
      authorId
      createdAt
      id
      title
      updatedAt
      username
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query User($email: String!) {
    user(email: $email) {
      username
      email
      id
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query Query($postId: ID!) {
    post(id: $postId) {
      authorId
      createdAt
      id
      title
      updatedAt
      username
    }
  }
`;

export const GET_SINGLE_USER_POST = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
      posts {
        createdAt
        id
        title
        updatedAt
        username
      }
    }
  }
`;
