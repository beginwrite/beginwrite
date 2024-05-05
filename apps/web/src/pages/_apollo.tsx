import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { default as createUploadLink } from 'apollo-upload-client/createUploadLink.mjs';
import React from 'react';

const redirect = (path: string) => {
  window.location.href = path;
};

const httpUploadLink = createUploadLink({
  uri: 'http://localhost:8000/graphql',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'content-type': 'application/json, multipart/form-data',
    'apollo-require-preflight': 'true',
  },
});

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });

    if (graphQLErrors.some((error) => error.message === 'Unauthorized')) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
      redirect('/login');
    }
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink.concat(httpUploadLink)]),
  cache: new InMemoryCache(),
});

export type ApolloProps = {
  children: React.ReactNode;
};

export default function Apollo({ children }: ApolloProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
