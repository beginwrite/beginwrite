import Button from '../Button';
import Input from '../Input';

import Form from './index';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Compoments/Common/Form',
  component: Form,
  args: {
    onSubmit: () => Promise.resolve(),
    children: (
      <>
        <Input type="text" placeholder="text" />
        <Input type="password" placeholder="password" />
        <Button>submit</Button>
      </>
    ),
  },
} as Meta<typeof Form>;

export const Primary: StoryObj<typeof Form> = {};
