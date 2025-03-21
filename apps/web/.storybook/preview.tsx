import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { initialize, mswLoader } from 'msw-storybook-addon';
import React from 'react';

import { handlers } from '../src/mocks';

import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

initialize();

export const decorators = [
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  (story) => <ApolloProvider client={client}>{story()}</ApolloProvider>,
];

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers,
    },
  },
};

export default preview;
