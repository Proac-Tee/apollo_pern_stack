// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

# A schema is a collection of type definitions (hence "typeDefs")
# that together define the "shape" of queries that are executed against
# your data.

# Define the User type, representing a user in the system
type User {
  id: ID!             # Unique identifier for the user
  email: String!      # Email address of the user
  username: String!   # Username of the user
  role: Role!         # Role of the user
  posts: [Post!]      # Posts written by the user (optional)
}

# Define the Post type, representing a post in the system
type Post {
  id: ID!             # Unique identifier for the post
  title: String!      # Title of the post
  createdAt: String!  # Date and time when the post was created (formatted as string)
  updatedAt: String  # Date and time when the post was last updated (formatted as string)
  authorId: String!
}

# Define the Role enum, representing different roles a user can have
enum Role {
  BASIC   # Basic role
  EDITOR  # Editor role
  ADMIN   # Admin role
}

# The "Query" type lists all available queries that clients can execute
# along with the return type for each.
type Query {
  user(id: ID!): User          # Fetch a user by ID
  users: [User!]               # Fetch all users
  post(id: ID!): Post           # Fetch a post by ID
  posts: [Post!]               # Fetch all posts
}

type Mutation {
  deletePost(id: ID!): Post
  deleteUser(id: ID!): User
  addUser(user: AddNewUserInput!): User
  addPost(posts:  AddUserPostInput!): Post
  updatePost(posts: UpdateUserPost!): Post
}



input AddNewUserInput {
  email: String!      # Email address of the user
  username: String!   # Username of the user
  posts: [String!]      # Posts written by the user (optional)
}

input AddUserPostInput {
  title: String!      # Title of the post
  authorId: String!       # Author of the post
}

input UpdateUserPost {
  title: String!
  id: ID!
}

`;
