import { within, expect } from '@storybook/test';

import Button from './index';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Compoments/Common/Button',
  component: Button,
} as Meta<typeof Button>;

export const Primary: StoryObj<typeof Button> = {};
