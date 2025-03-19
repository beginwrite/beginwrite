import { composeStories } from '@storybook/react';
import { fireEvent, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import { testRenderer } from '@/utils/testRenderer';

import * as stories from './index.stories';
import { useLogin } from './logic';

const { Primary } = composeStories(stories);

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}));

vi.mock('./logic', () => ({
  useLogin: vi.fn().mockReturnValue({
    handleSubmit: vi.fn(),
    register: vi.fn(),
  }),
}));

describe('Login', () => {
  test('ログイン画面が表示される', async () => {
    testRenderer(<Primary />);

    await expect(screen.findByText('ログイン')).resolves.toBeTruthy();
  });

  test('フォーム入力後、ログインボタンを押すとログインAPIが呼ばれる', () => {
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
