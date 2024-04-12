import { gql } from "@apollo/client";

// Define mutation
export const ADD_POST = gql`
  mutation Mutation($posts: AddUserPostInput!) {
    addPost(posts: $posts) {
      authorId
      createdAt
      id
      title
      username
      updatedAt
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($user: AddNewUserInput!) {
    addUser(user: $user) {
      email
      password
    }
  }
`;

// Define mutation
export const DELETE_POST = gql`
  # Increments a back-end counter and gets its resulting value
  mutation DeletePost($deletePostId: ID!) {
    deletePost(id: $deletePostId) {
      id
      title
    }
  }
`;

// Define mutation
export const UPDATE_POST = gql`
  # Increments a back-end counter and gets its resulting value
  mutation UpdatePost($posts: UpdateUserPost!) {
    updatePost(posts: $posts) {
      title
      updatedAt
      id
    }
  }
`;
