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
};

export const PasswordInput: StoryObj<typeof Input> = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
};
