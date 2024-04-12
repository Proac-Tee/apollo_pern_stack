import { resolvers } from "./resolvers";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/schema";
import { PrismaDataSource } from "./datasources/prisma-database";

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        dataSources: {
          prismaDataSource: new PrismaDataSource(),
        },
      };
    },
  });
  console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
}

startApolloServer();
