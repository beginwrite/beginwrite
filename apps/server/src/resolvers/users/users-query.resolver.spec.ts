import { createMock } from '@golevelup/ts-vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByIdUseCase } from 'src/use-cases/users/find-user-by-id.use-case';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { UsersRepository } from '../../domains/users/repositories/users.repository';

import { UsersQueryResolver } from './users-query.resolver';

describe('UsersQueryResolver', () => {
  let resolver: UsersQueryResolver;
  let findUserByIdUseCase: FindUserByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersQueryResolver,
        {
          provide: UsersRepository,
          useValue: createMock<UsersRepository>(),
        },
        {
          provide: FindUserByIdUseCase,
          useValue: createMock<FindUserByIdUseCase>(),
        },
      ],
    }).compile();

    resolver = module.get<UsersQueryResolver>(UsersQueryResolver);
    findUserByIdUseCase = module.get<FindUserByIdUseCase>(FindUserByIdUseCase);
  });

  it('resolver が定義されている', () => {
    expect(resolver).toBeDefined();
  });

  describe('user', () => {
    it('正常に実行される', async () => {
      const userId = '1';
      await resolver.user(userId);
      expect(findUserByIdUseCase.execute).toHaveBeenCalledTimes(1);
      expect(findUserByIdUseCase.execute).toHaveBeenCalledWith(userId);
    });

    it('存在しないIDを指定したらエラーが出る', async () => {
      const userId = '999';

      await resolver.user(userId);
      expect(findUserByIdUseCase.execute).toHaveBeenCalledTimes(1);
      expect(findUserByIdUseCase.execute).toHaveBeenCalledWith(userId);
    });
  });
});
