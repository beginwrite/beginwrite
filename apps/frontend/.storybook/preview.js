
/**
 * @todo MSW のモックデータを使って、Storybookでのテストを行いたい
 */

import { initialize, mswLoader, mswDecorator } from 'msw-storybook-addon';
import Apollo from '../src/pages/_apollo';
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
  },
};

export default preview;
