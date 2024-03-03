import React from 'react';
import { initialize, mswLoader, mswDecorator } from 'msw-storybook-addon';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { handlers } from '../src/mocks';
import type { Preview } from '@storybook/react';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

initialize();

export const decorators = [
  mswDecorator,
  (story) => <ApolloProvider client={client}>{story()}</ApolloProvider>,
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    loaders: [mswLoader],
    msw: {
      handlers,
    },
  },
};

export default preview;
