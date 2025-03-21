import { composeStories } from '@storybook/react';
import { screen } from '@testing-library/dom';
import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import * as stories from './index.stories';

const { TextInput } = composeStories(stories);

describe('Input', () => {
  test('Text Input', () => {
    render(<TextInput />);

    const textbox: HTMLTextAreaElement = screen.getByRole('textbox');

    expect(textbox).toBeTruthy();

    fireEvent.change(textbox, { target: { value: 'Updated Bio' } });

    expect(textbox.value).toEqual('Updated Bio');
  });
});
