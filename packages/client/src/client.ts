import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { from, ApolloLink } from 'apollo-link';

// cache
const cache = new InMemoryCache();

// http link
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

// graphql and netword errors
const errors = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// middlewares
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext((headers: {} = {}) => ({
    headers: {
      ...headers,
      authorization: 'token goes here.' || null
    }
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  link: from([errors, authMiddleware, httpLink]),
  cache
});
