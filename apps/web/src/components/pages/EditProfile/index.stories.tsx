import EditProfile from './index';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Compoments/Pages/EditProfile',
  component: EditProfile,
  args: {
    id: 1,
  },
} as Meta<typeof EditProfile>;

export const Primary: StoryObj<typeof EditProfile> = {};
