import { describe, test } from '@jest/globals';
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './index.stories';

const { Primary } = composeStories(stories);

describe('Primary', () => {
  test('renders correctly', async () => {
    render(<Primary />);

    expect(await screen.findByRole('button')).toBeTruthy();
  });
});
