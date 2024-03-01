import Users from './index';

import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';

export default {
  title: 'Compoments/Users',
  component: Users,
} as Meta<typeof Users>;

export const Primary: StoryObj<typeof Users> = {
  // unit test
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const topContent = await canvas.findAllByText('Name 1');
    await expect(topContent).toBeTruthy();
  },
};
