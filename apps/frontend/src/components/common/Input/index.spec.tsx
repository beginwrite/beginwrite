import { describe, test, expect } from '@jest/globals';
import { composeStories } from '@storybook/react';
import * as stories from './index.stories';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

const { TextInput } = composeStories(stories);

describe('Input', () => {
  test('Text Input', async () => {
    render(<TextInput />);
    expect(await screen.findByRole('textbox')).toBeTruthy();
  });
});
