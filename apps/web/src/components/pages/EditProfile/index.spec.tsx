import { createMock } from '@golevelup/ts-vitest';
import { composeStories } from '@storybook/react';
import { fireEvent, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import { testRenderer } from '@/utils/testRenderer';

import * as stories from './index.stories';
import { useUpdateProfile, useUpdateProfileAvatar } from './logic';

const { Primary } = composeStories(stories);

// Mock the hooks
vi.mock('./logic', () => ({
  useFetchData: vi.fn().mockReturnValue({
    error: null,
    data: {
      user: {
        id: '1',
        name: 'Name1',
        bio: 'Bio Profile',
        displayName: 'Name 1',
        avatar: 'https://placehold.jp/200x200.png',
        email: 'sample@example.com',
      },
    },
  }),
  useUpdateProfile: vi.fn().mockReturnValue({
    handleSubmit: vi.fn(),
    register: vi.fn().mockReturnValue({}),
  }),
  useUpdateProfileAvatar: vi.fn().mockReturnValue({
    handleAvatarUpload: vi.fn(),
  }),
}));

describe('EditProfile', () => {
  test('プロフィール編集画面が表示される', async () => {
    testRenderer(<Primary />);

    await expect(screen.findAllByText('Edit Profile')).resolves.toBeTruthy();
    await expect(screen.findAllByText('Name 1')).resolves.toBeTruthy();
    await expect(screen.findAllByText('Bio Profile')).resolves.toBeTruthy();
  });

  test('フォーム入力後、更新ボタンを押すとプロフィール更新APIが呼ばれる', () => {
    testRenderer(<Primary />);

    const displayNameInput = screen.getByDisplayValue('Name 1');
    const bioTextarea = screen.getByDisplayValue('Bio Profile');

    fireEvent.change(displayNameInput, { target: { value: 'Updated Name' } });
    fireEvent.change(bioTextarea, { target: { value: 'Updated Bio' } });

    const submitButton = screen.getByText('Update');
    fireEvent.click(submitButton);

    const { handleSubmit } = useUpdateProfile('1');

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test.skip('アバター画像をアップロードするとアバター更新APIが呼ばれる', () => {
    testRenderer(<Primary />);

    const fileInput = screen.getByRole('region', { name: 'ファイルを選択' });
    fireEvent.change(fileInput, {
      target: {
        files: [createMock<File>({ name: 'avatar.jpg', type: 'image/jpeg' })],
      },
    });

    // TODO:  テストが動かないので、後で修正
    const { handleAvatarUpload } = useUpdateProfileAvatar('1');

    expect(handleAvatarUpload).toHaveBeenCalledTimes(1);
  });
});
