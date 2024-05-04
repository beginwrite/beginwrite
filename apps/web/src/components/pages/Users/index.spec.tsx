import { describe, test, expect } from '@jest/globals';
import { composeStories } from '@storybook/react';
import { screen } from '@testing-library/react';

import { testRenderer } from '@/utils/testRenderer';

import * as stories from './index.stories';

const { Primary } = composeStories(stories);

describe.skip('Primary', () => {
  test('renders correctly', async () => {
    testRenderer(<Primary />);
    expect(await screen.findByText('Name 1')).toBeTruthy();
  });
});
