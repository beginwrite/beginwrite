import { createMock } from '@golevelup/ts-vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/domains/entities/users.entity';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { UsersRepository } from '../../repositorys/users.repository';

import { UsersQueryResolver } from './users-query.resolver';

describe('UsersQueryResolver', () => {
  let resolver: UsersQueryResolver;
  let usersRepository: UsersRepository;

  // TODO: モックデータは共通化したい
  const mockUsers: User[] = [
    {
      id: 1,
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John Doe',
      displayName: 'Johnny',
      bio: 'Software developer with 5 years of experience',
      avatar: 'https://example.com/avatars/john.jpg',
      email: 'john@example.com',
      hash: 'hashed_password_1',
      accessToken: 'access_token_1',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      id: 2,
      uuid: '223e4567-e89b-12d3-a456-426614174001',
      name: 'Jane Doe',
      displayName: 'Janey',
      bio: 'UX Designer passionate about user experience',
      avatar: 'https://example.com/avatars/jane.jpg',
      email: 'jane@example.com',
      hash: 'hashed_password_2',
      accessToken: 'access_token_2',
      createdAt: '2025-01-02T00:00:00Z',
      updatedAt: '2025-01-02T00:00:00Z',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersQueryResolver,
        {
          provide: UsersRepository,
          useValue: createMock<UsersRepository>({
            findAll: vi.fn().mockResolvedValue(mockUsers),
            findById: vi.fn().mockImplementation((id: string) => {
              return mockUsers.find((user) => user.id === parseInt(id));
            }),
          }),
        },
      ],
    }).compile();

    resolver = module.get<UsersQueryResolver>(UsersQueryResolver);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('resolver が定義されている', () => {
    expect(resolver).toBeDefined();
  });

  describe('users', () => {
    it('正常に実行される', async () => {
      const result = await resolver.users();

      expect(result).toEqual(mockUsers);
      expect(usersRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('user', () => {
    it('正常に実行される', async () => {
      const userId = '1';
      const result = await resolver.user(userId);

      expect(result).toEqual(
        expect.objectContaining({
          id: 1,
        }),
      );
      expect(usersRepository.findById).toHaveBeenCalledTimes(1);
      expect(usersRepository.findById).toHaveBeenCalledWith(userId);
    });

    it('存在しないIDを指定したらエラーが出る', async () => {
      const userId = '999';

      const result = await resolver.user(userId);

      expect(result).toEqual(
        expect.not.objectContaining({
          id: 1,
        }),
      );
      expect(usersRepository.findById).toHaveBeenCalledTimes(1);
      expect(usersRepository.findById).toHaveBeenCalledWith(userId);
    });
  });
});
