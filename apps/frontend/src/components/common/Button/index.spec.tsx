import { describe, test } from '@jest/globals';
import { composeStories } from '@storybook/react';
import * as stories from './index.stories';
import { render } from '@testing-library/react';

const { Primary } = composeStories(stories);

describe('Primary', () => {
  test('renders correctly', () => {
    render(<Primary />);
    Primary.play({ canvasElement: document.body });
  });
});
