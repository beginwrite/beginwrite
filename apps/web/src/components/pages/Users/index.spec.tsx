import { composeStories } from '@storybook/react';
import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import { testRenderer } from '@/utils/testRenderer';

import * as stories from './index.stories';

const { Primary } = composeStories(stories);

describe('Primary', () => {
  test('renders correctly', async () => {
    testRenderer(<Primary />);

    expect(await screen.findByText('Name 1')).toBeTruthy();
  });
});
