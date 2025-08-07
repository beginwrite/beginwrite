import { IMutationCreateUserArgs } from '@beginwrite/graphql-codegen';
import { createMock } from '@golevelup/ts-vitest';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { mockUsers } from 'src/mocks/users';

import { UsersRepository } from '../../../domains/users/repositories/users.repository';

import { CreateUserUseCase } from './create-user.use-case';

// bcryptをモック化
vi.mock('bcryptjs', () => ({
  hash: vi.fn(),
}));

describe('CreateUserUseCase', () => {
  let usecase: CreateUserUseCase;
  let usersRepository: UsersRepository;
  const mockUser = mockUsers[0];

  const mockCreateUserArgs: IMutationCreateUserArgs = {
    data: {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UsersRepository,
          useValue: createMock<UsersRepository>(),
        },
      ],
    }).compile();

    usecase = module.get<CreateUserUseCase>(CreateUserUseCase);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('usecase が定義されている', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('正常に実行される', async () => {
      const hashedPassword = 'hashed_password';
      vi.mocked(bcrypt.hash).mockResolvedValue(hashedPassword as never);
      vi.mocked(usersRepository.createUser).mockResolvedValue(mockUser);

      const result = await usecase.execute(mockCreateUserArgs);

      expect(usersRepository.createUser).toHaveBeenCalledTimes(1);
      expect(usersRepository.createUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        hash: hashedPassword,
        name: 'Test User',
      });
      expect(result).toEqual(mockUser);
    });

    it('メールアドレスがない場合、エラーをスローする', async () => {
      const argsWithoutEmail: IMutationCreateUserArgs = {
        data: {
          email: null,
          name: 'Test User',
          password: 'password123',
        },
      };

      await expect(usecase.execute(argsWithoutEmail)).rejects.toThrow(
        'Email is required',
      );
      expect(usersRepository.createUser).toHaveBeenCalledTimes(0);
    });

    it('パスワードがない場合、エラーをスローする', async () => {
      const argsWithoutPassword: IMutationCreateUserArgs = {
        data: {
          email: 'test@example.com',
          name: 'Test User',
          password: null,
        },
      };

      await expect(usecase.execute(argsWithoutPassword)).rejects.toThrow(
        'Password is required',
      );
      expect(usersRepository.createUser).toHaveBeenCalledTimes(0);
    });

    it('名前がない場合、エラーをスローする', async () => {
      const argsWithoutName: IMutationCreateUserArgs = {
        data: {
          email: 'test@example.com',
          name: null,
          password: 'password123',
        },
      };

      await expect(usecase.execute(argsWithoutName)).rejects.toThrow(
        'Name is required',
      );
      expect(usersRepository.createUser).toHaveBeenCalledTimes(0);
    });
  });
});
