import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
});

export type ApolloProps = {
  children: React.ReactNode;
};

export default function Apollo({ children }: ApolloProps) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
