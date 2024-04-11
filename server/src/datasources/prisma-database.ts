import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";

interface CreateUserProps {
  user: {
    email: string;
    username: string;
    posts: string[]; // Assuming writtenPosts is an array of post IDs
  };
}

interface CreatePostProps {
  posts: {
    title: string; // Title of the post
    authorId: string; // ID of the author
  };
}

interface UpdatePostProps {
  posts: {
    title: string; // Title of the post
    id: string;
  };
}

export class PrismaDataSource {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /****
   *
   * Get function block of all endpoints
   *
   */

  /**
   * get single user
   * @param id string input
   * @returns single user that matches id params
   */
  async getSingleUser(id: string) {
    try {
      const user = await this.prisma.user.findFirst({ where: { id } });
      return user || null; // Return null if no user is found
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  /**
   *  // get all users
   * @returns all users fetched
   */
  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  /**
   *  // get single post
   * @param id string inpit
   * @returns single post that matches id params
   */
  async getSinglePost(id: string) {
    try {
      const post = await this.prisma.post.findFirst({ where: { id } });
      return post || null; // Return null if no post is found
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  /**
   *   // get all post
   * @returns all fetched posts
   */
  async getAllPosts() {
    try {
      const posts = await this.prisma.post.findMany();
      return posts;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  /**
   *
   * @param id user id input params
   * @returns all posts array for matched user id
   */
  async getSingleUserPosts(id: string) {
    try {
      const posts = await this.prisma.post.findMany({
        where: { authorId: id },
      });

      if (posts.length === 0) {
        return null; // Return null if no posts are found
      }

      return posts;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  /**
   * Create fucntion block for all endpoints
   *
   *
   *
   */

  /**
   * Create user function
   *
   * @param args user inputs object
   * @returns  inputs
   */

  // create single user
  async createSingleUser(args: CreateUserProps) {
    const { email, posts } = args.user; // Destructure args

    try {
      // Generate a random username
      const randomUsername = generateRandomUsername();
      // Create a new user object with the provided arguments
      const newUser = {
        username: randomUsername,
        email,
        posts,
      };

      // Use the Prisma `create` method to create a new user
      const user = await this.prisma.user.create({ data: newUser });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  // create single post by user
  async createSinglePost(args: CreatePostProps) {
    const { title, authorId } = args.posts; // Destructure args

    try {
      // Create a new user object with the provided arguments
      const newPost = {
        title,
        authorId,
      };

      // Use the Prisma `create` method to create a new user
      const post = await this.prisma.post.create({ data: newPost });
      return post;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  /**
   * Update Block
   */

  /**
   * update post function
   * @param args id and titlte in strings format
   * @returns  updated post
   */
  async updatePost(args: UpdatePostProps) {
    const { title, id } = args.posts; // Destructure title and id directly from args

    try {
      // Use the Prisma `update` method to update the post
      const updatedPost = await this.prisma.post.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });
      return updatedPost;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  /**
   * Delete block
   */

  /**
   * delete user function
   * @param id id of user to delete
   * @returns deleted user
   */
  async deleteUser(id: string) {
    try {
      // Use the Prisma `create` method to delete an user
      const deletedUser = await this.prisma.user.delete({ where: { id } });
      return deletedUser;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  /**
   * delette upost function
   * @param id id of post to delete
   * @returns deleted post
   */
  async deletePost(id: string) {
    try {
      // Use the Prisma `create` method to delete a post
      const deletedPost = await this.prisma.post.delete({ where: { id } });
      return deletedPost;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

// Function to generate a random username
function generateRandomUsername() {
  const randomBytesString = randomBytes(4).toString("hex");
  return `user_${randomBytesString}`;
}
