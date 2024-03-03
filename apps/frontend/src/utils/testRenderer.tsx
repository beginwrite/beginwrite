import React from 'react';
import { GraphQLHandler, GraphQLRequest } from 'msw';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { render } from '@testing-library/react';
import { server } from '@/mocks/index';
import fetch from 'cross-fetch';

export const testRenderer =
  (children: React.ReactNode) =>
  (responseOverride?: GraphQLHandler<GraphQLRequest<never>>) => {
    const link = new HttpLink({
      uri: 'http://localhost:8000/graphql',
      credentials: 'same-origin',
      fetch,
    });

    const client = new ApolloClient({
      link,
      uri: 'http://localhost:8000/graphql',
      cache: new InMemoryCache(),
    });

    if (responseOverride) {
      server.use(responseOverride);
    }
    render(<ApolloProvider client={client}>{children}</ApolloProvider>);
  };
