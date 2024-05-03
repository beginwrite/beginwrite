import { describe, test } from '@jest/globals';
import { composeStories } from '@storybook/react';
import * as stories from './index.stories';
import { render, screen } from '@testing-library/react';

const { Primary } = composeStories(stories);

describe('Primary', () => {
  test('renders correctly', async () => {
    render(<Primary />);
    expect(await screen.findByRole('button')).toBeTruthy();
  });
});
