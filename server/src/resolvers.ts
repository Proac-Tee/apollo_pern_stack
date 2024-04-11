// Define the User type
interface User {
  id: string; // Unique identifier for the user
  email: string; // Email address of the user
  username: string; // Username of the user
  role: Role; // Role of the user
  posts?: Post[]; // Posts written by the user (optional)
}

// Define the Post type
interface Post {
  id: string; // Unique identifier for the post
  title: string; // Title of the post
  createdAt: string; // Date and time when the post was created (formatted as string)
  updatedAt: string; // Date and time when the post was last updated (formatted as string)
  author: User; // Author of the post
}

// Define the Role enum
enum Role {
  BASIC = "BASIC", // Basic role
  EDITOR = "EDITOR", // Editor role
  ADMIN = "ADMIN", // Admin role
}

export const resolvers = {
  Query: {
    user: async (_parent: User, args: { id: string }, { dataSources }: any) => {
      return dataSources.prismaDataSource.getSingleUser(args.id); // Example function to fetch users
    },
    users: async (_parent: User, _args: unknown, { dataSources }: any) => {
      return dataSources.prismaDataSource.getAllUsers(); // Example function to fetch users
    },
    post: async (
      __parent: Post,
      args: { id: string },
      { dataSources }: any
    ) => {
      return dataSources.prismaDataSource.getSinglePost(args.id); // Example function to fetch users
    },
    posts: async (__parent: Post, _args: unknown, { dataSources }: any) => {
      return dataSources.prismaDataSource.getAllPosts(); // Example function to fetch users
    },
  },

  User: {
    posts: async (parent: Post, _args: unknown, { dataSources }: any) => {
      return dataSources.prismaDataSource.getSingleUserPosts(parent.id); // Example function to fetch users
    },
  },

  Mutation: {
    deletePost: async (
      _parent: Post,
      args: { id: string },
      { dataSources }: any
    ) => {
      return dataSources.prismaDataSource.deletePost(args.id); // Example function to fetch users
    },
    deleteUser: async (
      _parent: User,
      args: { id: string },
      { dataSources }: any
    ) => {
      return dataSources.prismaDataSource.deletUser(args.id); // Example function to fetch users
    },

    addUser: async (
      _parent: User,
      args: { username: string; email: string; posts: string },
      { dataSources }: any
    ) => {
      // Call the function to create a single user with the destructured args
      return dataSources.prismaDataSource.createSingleUser(args);
    },

    addPost: async (
      _parent: Post,
      args: { title: string; authorId: string },
      { dataSources }: any
    ) => {
      return dataSources.prismaDataSource.createSinglePost(args); // Example function to fetch users
    },

    updatePost: async (
      _parent: Post,
      args: { id: string; title: string },
      { dataSources }: any
    ) => {
      return dataSources.prismaDataSource.updatePost(args); // Example function to fetch users
    },
  },
};
