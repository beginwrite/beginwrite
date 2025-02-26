import Editor from './index';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Compoments/Common/Editor',
  component: Editor,
  args: {
    onChange: () => {},
    value: '',
  },
} as Meta<typeof Editor>;

export const Default: StoryObj<typeof Editor> = {};
