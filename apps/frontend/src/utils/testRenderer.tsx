import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { render } from '@testing-library/react';
import fetch from 'cross-fetch';
import React from 'react';

export const testRenderer = (children: React.ReactNode) => {
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

  return render(<ApolloProvider client={client}>{children}</ApolloProvider>);
};
