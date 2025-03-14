import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, test } from 'vitest';

import * as stories from './index.stories';

const { Primary } = composeStories(stories);

describe('Primary', () => {
  test('renders correctly', async () => {
    render(<Primary />);

    expect(await screen.findByRole('button')).toBeTruthy();
  });
});
