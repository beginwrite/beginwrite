import { createMock } from '@golevelup/ts-vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { LoginUseCase } from '../../applications/use-cases/users/login/login.use-case';
import { mockUsers } from '../../mocks/users';

import { AuthMutationResolver } from './auth-mutation.resolver';

describe('AuthMutationResolver', () => {
  let resolver: AuthMutationResolver;
  let loginUseCase: LoginUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthMutationResolver,
        {
          provide: LoginUseCase,
          useValue: createMock<LoginUseCase>(),
        },
      ],
    }).compile();

    resolver = module.get<AuthMutationResolver>(AuthMutationResolver);
    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
  });

  it('resolver が定義されている', () => {
    expect(resolver).toBeDefined();
  });

  describe('auth', () => {
    it('正常に実行される', async () => {
      // モックユーザーを使用
      const mockUser = mockUsers[0];

      // コンテキストオブジェクトを作成（GqlAuthGuardによって認証されたユーザー情報が含まれる）
      const context = {
        user: mockUser,
      };

      // auth mutationの引数
      const args = {
        data: {
          email: mockUser.email,
          password: 'password', // 実際のパスワードは使用されない（GqlAuthGuardで認証済みの前提）
        },
      };

      // loginUseCaseのexecuteメソッドが正しいユーザーで呼び出されることを確認
      await resolver.auth(args, context);

      expect(loginUseCase.execute).toHaveBeenCalledTimes(1);
      expect(loginUseCase.execute).toHaveBeenCalledWith(mockUser);
    });
  });
});
