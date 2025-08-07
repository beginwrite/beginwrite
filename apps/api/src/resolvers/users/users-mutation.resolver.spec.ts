import { createMock } from '@golevelup/ts-vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { CreateUserUseCase } from '../../applications/use-cases/users/create-user/create-user.use-case';
import { UpdateUserProfileUseCase } from '../../applications/use-cases/users/update-user-profile/update-user-profile.use-case';
import { UpdateUserProfileAvatarUseCase } from '../../applications/use-cases/users/update-user-profile-avatar/update-user-profile-avatar.use-case';
import { UsersRepository } from '../../domains/users/repositories/users.repository';
import { S3Service } from '../../infrastructure/services/s3.service';

import { UsersMutationResolver } from './users-mutation.resolver';

describe('UsersMutationResolver', () => {
  let resolver: UsersMutationResolver;
  let createUserUseCase: CreateUserUseCase;
  let updateUserProfileUseCase: UpdateUserProfileUseCase;
  let updateProfileAvatarUseCase: UpdateUserProfileAvatarUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersMutationResolver,
        {
          provide: UsersRepository,
          useValue: createMock<UsersRepository>(),
        },
        {
          provide: CreateUserUseCase,
          useValue: createMock<CreateUserUseCase>(),
        },
        {
          provide: UpdateUserProfileUseCase,
          useValue: createMock<UpdateUserProfileUseCase>(),
        },
        {
          provide: UpdateUserProfileAvatarUseCase,
          useValue: createMock<UpdateUserProfileAvatarUseCase>(),
        },
        {
          provide: S3Service,
          useValue: createMock<S3Service>(),
        },
      ],
    }).compile();

    resolver = module.get<UsersMutationResolver>(UsersMutationResolver);
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    updateUserProfileUseCase = module.get<UpdateUserProfileUseCase>(
      UpdateUserProfileUseCase,
    );
    updateProfileAvatarUseCase = module.get<UpdateUserProfileAvatarUseCase>(
      UpdateUserProfileAvatarUseCase,
    );
  });

  it('resolver が定義されている', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
    it('正常に実行される', async () => {
      const args = {
        data: {
          email: 'test@example.com',
          password: 'password',
          name: 'Test User',
        },
      };
      await resolver.createUser(args);

      expect(createUserUseCase.execute).toHaveBeenCalledTimes(1);
      expect(createUserUseCase.execute).toHaveBeenCalledWith(args);
    });
  });

  describe('updateUserProfile', () => {
    it('正常に実行される', async () => {
      const args = {
        data: {
          id: '1',
          displayName: 'Updated Name',
          bio: 'Updated Bio',
        },
      };
      await resolver.updateUserProfile(args);

      expect(updateUserProfileUseCase.execute).toHaveBeenCalledTimes(1);
      expect(updateUserProfileUseCase.execute).toHaveBeenCalledWith(args);
    });
  });

  describe('uploadProfileAvatar', () => {
    it('正常に実行される', async () => {
      const userId = '1';
      const file = {
        file: {
          filename: 'avatar.jpg',
          mimetype: 'image/jpeg',
          encoding: '7bit',
          fieldName: 'file',
          // TODO: モック定義を見直す
          createReadStream: vi.fn().mockReturnValue({
            on: vi.fn().mockImplementation(function (event, callback) {
              if (event === 'data') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                void callback(Buffer.from('test'));
              }
              if (event === 'end') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                void callback();
              }
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              return this;
            }),
          }),
        },
      };
      await resolver.uploadProfileAvatar(userId, file);

      expect(updateProfileAvatarUseCase.execute).toHaveBeenCalledTimes(1);
      expect(updateProfileAvatarUseCase.execute).toHaveBeenCalledWith(
        userId,
        file,
      );
    });
  });
});
