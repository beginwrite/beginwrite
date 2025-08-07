import { createMock } from '@golevelup/ts-vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { mockUsers } from 'src/mocks/users';

import { UsersRepository } from '../../../../domains/users/repositories/users.repository';

import { UpdateUserProfileUseCase } from './update-user-profile.use-case';

describe('UpdateUserProfileUseCase', () => {
  let usecase: UpdateUserProfileUseCase;
  let usersRepository: UsersRepository;
  const mockUser = mockUsers[0];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserProfileUseCase,
        {
          provide: UsersRepository,
          useValue: createMock<UsersRepository>({
            updateUserProfile: vi.fn().mockResolvedValue(mockUser),
            findById: vi.fn().mockResolvedValue(mockUser),
          }),
        },
      ],
    }).compile();

    usecase = module.get<UpdateUserProfileUseCase>(UpdateUserProfileUseCase);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('usecase が定義されている', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('正常に実行される', async () => {
      await usecase.execute({
        data: {
          id: String(mockUser.id),
          displayName: 'Updated Name',
          bio: 'Updated Bio',
        },
      });

      expect(usersRepository.updateUserProfile).toHaveBeenCalledTimes(1);
      expect(usersRepository.updateUserProfile).toHaveBeenCalledWith({
        id: String(mockUser.id),
        displayName: 'Updated Name',
        bio: 'Updated Bio',
      });
    });

    it('ユーザIDが存在しない場合、エラーをスローする', async () => {
      await expect(
        usecase.execute({
          data: {
            id: null,
            displayName: 'Updated Name',
            bio: 'Bio',
          },
        }),
      ).rejects.toThrow('User ID is required');
    });

    it('displayName が空文字の場合、エラーをスローする', async () => {
      await expect(
        usecase.execute({
          data: {
            id: String(mockUser.id),
            displayName: '',
            bio: 'Bio',
          },
        }),
      ).rejects.toThrow('Display Name is required');
    });
  });
});
