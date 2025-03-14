import Editor from './index';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Compoments/Common/Editor',
  component: Editor,
  args: {
    name: 'content',
    value: '#aaaa\n##bbbbb\n\ntest',
  },
} as Meta<typeof Editor>;

export const Default: StoryObj<typeof Editor> = {};
