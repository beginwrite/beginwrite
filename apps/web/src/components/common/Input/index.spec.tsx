import { composeStories } from '@storybook/react';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import * as stories from './index.stories';

const { TextInput } = composeStories(stories);

describe('Input', () => {
  test('Text Input', async () => {
    const { container } = render(<TextInput />);

    await expect(screen.findByRole('textbox')).resolves.toBeTruthy();
    await expect(
      TextInput.play!({ canvasElement: container }),
    ).resolves.toBeUndefined();
  });
});
