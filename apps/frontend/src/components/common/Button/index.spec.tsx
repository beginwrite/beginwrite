import { describe, test, expect } from '@jest/globals';
import { composeStories } from '@storybook/react';
import * as stories from './index.stories';
import { within } from '@storybook/test';
import { render } from '@testing-library/react';

const { Primary } = composeStories(stories);

describe('Primary', () => {
  test('renders correctly', () => {
    render(<Primary />);
    const canvas = within(document.body);
    expect(canvas.getByText('Button')).toBeTruthy();
  });
});
