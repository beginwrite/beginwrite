import { initialize, mswLoader, mswDecorator } from 'msw-storybook-addon';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { handlers } from '../src/mocks';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

initialize();

export const decorators = [
  mswDecorator,
  story => (
    <ApolloProvider client={client}>
      {story()}
    </ApolloProvider> 
  )
];

/** @type { import('@storybook/react').Preview } */
const preview = {
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
      handlers
    }
  },
};

export default preview;
