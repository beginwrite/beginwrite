import { describe, test, expect } from '@jest/globals';
import { composeStories } from '@storybook/react';
import * as stories from './index.stories';
import { within } from '@storybook/test';
import { testRenderer } from '@/utils/testRenderer';

const { Primary } = composeStories(stories);

describe('Primary', () => {
  test('renders correctly', () => {
    testRenderer(<Primary />);
    const canvas = within(document.body);
    expect(canvas.findByText('Name 1')).toBeTruthy();
  });
});
