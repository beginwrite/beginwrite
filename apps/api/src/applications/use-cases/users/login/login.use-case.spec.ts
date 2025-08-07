import { createMock } from '@golevelup/ts-vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { mockUsers } from 'src/mocks/users';

import { AuthRepository } from '../../../../infrastructure/repositories/auth.repository';

import { LoginUseCase } from './login.use-case';

describe('LoginUseCase', () => {
  let usecase: LoginUseCase;
  let authRepository: AuthRepository;
  const mockUser = mockUsers[0];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: AuthRepository,
          useValue: createMock<AuthRepository>(),
        },
      ],
    }).compile();

    usecase = module.get<LoginUseCase>(LoginUseCase);
    authRepository = module.get<AuthRepository>(AuthRepository);
  });

  it('usecase が定義されている', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('正常に実行される', async () => {
      await usecase.execute(mockUser);

      expect(authRepository.auth).toHaveBeenCalledTimes(1);
      expect(authRepository.auth).toHaveBeenCalledWith(mockUser);
    });
  });
});
