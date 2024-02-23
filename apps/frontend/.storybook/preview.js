import { initialize, mswLoader, mswDecorator } from 'msw-storybook-addon';
import Apollo from '../src/pages/_apollo';
import { handlers } from '../src/mocks';
initialize();

export const decorators = [
  mswDecorator,
  story => (
    <Apollo>
      {story()}
    </Apollo>
  ),
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
