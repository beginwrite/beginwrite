import { composeStories } from '@storybook/react';
import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import { testRenderer } from '@/utils/testRenderer';

import * as stories from './index.stories';

const { Primary } = composeStories(stories);

describe('PostDetailPage', () => {
  test('投稿詳細が表示されている', async () => {
    testRenderer(<Primary />);

    await expect(screen.findByText('PostDetailPage')).resolves.toBeTruthy();
  });
});
