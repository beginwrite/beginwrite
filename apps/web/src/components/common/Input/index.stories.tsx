import { within, userEvent } from '@storybook/test';
import { expect } from 'vitest';

import Input from './index';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Compoments/Common/Input',
  component: Input,
} as Meta<typeof Input>;

export const TextInput: StoryObj<typeof Input> = {
  args: {
    type: 'text',
    placeholder: 'Enter your name',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('textbox'), 'Hello, World!');

    expect(canvas.getByRole('textbox')).toHaveValue('Hello, World!');
  },
};

export const PasswordInput: StoryObj<typeof Input> = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
};
