import { describe, test, expect } from '@jest/globals';
import { composeStories } from '@storybook/react';
import { fireEvent, screen } from '@testing-library/react';

import { testRenderer } from '@/utils/testRenderer';

import * as stories from './index.stories';
import { useLogin } from './logic';

const { Primary } = composeStories(stories);

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock('./logic', () => ({
  useLogin: jest.fn().mockReturnValue({
    handleSubmit: jest.fn(),
    register: jest.fn(),
  }),
}));

describe('Login', () => {
  test('ログイン画面が表示される', async () => {
    testRenderer(<Primary />);

    expect(await screen.findByText('ログイン')).toBeTruthy();
  });

  test('フォーム入力後、ログインボタンを押すとログインAPIが呼ばれる', async () => {
    testRenderer(<Primary />);

    const emailInput = screen.getByPlaceholderText('emailを入力...');
    const passwordInput = screen.getByPlaceholderText('passwordを入力...');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const submitButton = screen.getByText('ログイン');
    fireEvent.click(submitButton);

    const submit = useLogin().handleSubmit;

    expect(submit).toHaveBeenCalledTimes(1);
  });
});
