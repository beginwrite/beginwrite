import { useForm } from 'react-hook-form';

import Editor from './index';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Compoments/Common/Editor',
  component: Editor,
  args: {
    onChange: async () => {},
    value: '',
  },
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          content: '',
        },
      });

      const { onChange } = { ...form.register('content') };

      return (
        <div style={{ width: 800 }}>
          <Story onChnage={onChange} />
        </div>
      );
    },
  ],
} as Meta<typeof Editor>;

export const Default: StoryObj<typeof Editor> = {};
