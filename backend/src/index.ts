import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import connectDB from './config/db.js';
import typeDefs from './schema/typeDefs.js';
import resolvers from './schema/resolvers.js';

// Connect to MongoDB
connectDB();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`Server ready at ${url}`);
};

startServer();