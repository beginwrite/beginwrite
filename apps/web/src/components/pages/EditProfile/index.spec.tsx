import { describe, test, expect } from '@jest/globals';
import { composeStories } from '@storybook/react';
import { screen } from '@testing-library/react';

import { testRenderer } from '@/utils/testRenderer';

import * as stories from './index.stories';

const { Primary } = composeStories(stories);

describe('EditProfile', () => {
  test('フォームが表示されている', async () => {
    testRenderer(<Primary />);

    expect(await screen.findByText('Edit Profile')).toBeTruthy();
    expect(screen.getByAltText('アバター画像')).toBeTruthy();
  });
});
