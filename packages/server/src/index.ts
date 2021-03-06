import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { connect } from './db';
import { GraphQLSchema } from 'graphql';
import { getCurrentUser } from './utils/getCurrentUser';

const generateSchema = async (): Promise<GraphQLSchema> => {
  try {
    const schema = await buildSchema({
      resolvers: [__dirname + '/modules/**/*.ts']
    });
    return schema;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

(async () => {
  // port
  const PORT = process.env.PORT || 4000;

  // create db connection
  await connect();

  // graphql schema
  const schema = await generateSchema();

  // instantiate apollo server
  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      // find current user
      const authorization: string = req.headers.authorization || '';
      const token: string = authorization ? authorization.split(' ')[1] : '';
      const user = token ? await getCurrentUser(token) : null;

      return { req, res, user };
    }
  });

  // instantiate express app
  const app = express();

  // middlewares
  app.use(cors({ credentials: true, origin: true }));

  // pass express app as middleware to apollo server
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log('Server is ready on port 4000');
  });
})();
