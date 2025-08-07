import { createMock } from '@golevelup/ts-vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { UsersRepository } from '../../../../infrastructure/repositories/users.repository';

import { FindUserByIdUseCase } from './find-user-by-id.use-case';

describe('FindUserByIdUseCase', () => {
  let usecase: FindUserByIdUseCase;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdUseCase,
        {
          provide: UsersRepository,
          useValue: createMock<UsersRepository>(),
        },
      ],
    }).compile();

    usecase = module.get<FindUserByIdUseCase>(FindUserByIdUseCase);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('usecase が定義されている', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('正常に実行される', async () => {
      await usecase.execute('1');

      expect(usersRepository.findById).toHaveBeenCalledTimes(1);
      expect(usersRepository.findById).toHaveBeenCalledWith('1');
    });
  });
});
