import cors from "cors";
import { resolvers } from "./resolvers";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema/schema";
import { PrismaDataSource } from "./datasources/prisma-database";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";

async function startApolloServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Note you must call `start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await server.start();

  // Specify the path where we'd like to mount our server
  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async () => {
        return {
          dataSources: {
            prismaDataSource: new PrismaDataSource(),
          },
        };
      },
    })
  );

  const PORT = process.env.PORT || 4000; // You can change the port as needed
  app.listen(PORT, () => {
    console.log(`
      🚀  Server is running
      🔉  Listening on port ${PORT}
      📭  Query at 
    `);
  });
}

startApolloServer();
