import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from '@testing-library/react';
import React from 'react';

export const testRenderer = (children: React.ReactNode) => {
  const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache(),
  });

  return render(<ApolloProvider client={client}>{children}</ApolloProvider>);
};
