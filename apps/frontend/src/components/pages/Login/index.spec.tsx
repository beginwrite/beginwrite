import { describe, test, expect } from '@jest/globals';
import { composeStories } from '@storybook/react';
import * as stories from './index.stories';
import { testRenderer } from '@/utils/testRenderer';
import { screen } from '@testing-library/react';

const { Primary } = composeStories(stories);

describe('Login', () => {
  test('successful', async () => {
    testRenderer(<Primary />);
    expect(await screen.findByText('Login')).toBeTruthy();
  });
});
