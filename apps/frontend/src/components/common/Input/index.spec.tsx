import { describe, test, expect } from '@jest/globals';
import { composeStories } from '@storybook/react';
import * as stories from './index.stories';
import { within } from '@storybook/test';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const { TextInput } = composeStories(stories);

describe('Input', () => {
  test('Text Input', async () => {
    render(<TextInput />);
    TextInput.play({ canvasElement: document.body });
  });
});
