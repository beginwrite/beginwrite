import Button from './index';
import { within, expect } from '@storybook/test';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Compoments/Common/Button',
  component: Button,
} as Meta<typeof Button>;

export const Primary: StoryObj<typeof Button> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(await canvas.findByText('button')).toBeTruthy();
  },
};
