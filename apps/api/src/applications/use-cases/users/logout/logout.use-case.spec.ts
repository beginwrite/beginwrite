import { createMock } from '@golevelup/ts-vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { mockUsers } from 'src/mocks/users';

import { AuthRepository } from '../../../../infrastructure/repositories/auth.repository';

import { LogoutUseCase } from './logout.use-case';

describe('LogoutUseCase', () => {
  let usecase: LogoutUseCase;
  let authRepository: AuthRepository;
  const mockUser = mockUsers[0];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogoutUseCase,
        {
          provide: AuthRepository,
          useValue: createMock<AuthRepository>(),
        },
      ],
    }).compile();

    usecase = module.get<LogoutUseCase>(LogoutUseCase);
    authRepository = module.get<AuthRepository>(AuthRepository);
  });

  it('usecase が定義されている', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('正常に実行される', async () => {
      await usecase.execute(mockUser);

      expect(authRepository.logout).toHaveBeenCalledTimes(1);
      expect(authRepository.logout).toHaveBeenCalledWith(mockUser);
    });
  });
});
