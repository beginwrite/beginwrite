import { composeStories } from '@storybook/react';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import * as stories from './index.stories';

const { TextInput } = composeStories(stories);

describe('Input', () => {
  test('Text Input', async () => {
    const { container } = render(<TextInput />);

    expect(await screen.findByRole('textbox')).toBeTruthy();
    expect(await TextInput.play!({ canvasElement: container })).toBeUndefined();
  });
});
