import { createMock } from '@golevelup/ts-vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { mock, describe, it, expect, vi, beforeEach } from 'vitest';

import { S3Service } from 'src/applications/services/s3.service';
import { mockUsers } from 'src/mocks/users';

import { UsersRepository } from '../../repositories/users.repository';

import { UpdateUserProfileAvatarUseCase } from './update-user-profile-avatar.use-case';

describe('UpdateUserProfileAvatarUseCase', () => {
  let usecase: UpdateUserProfileAvatarUseCase;
  let usersRepository: UsersRepository;
  let s3Service: S3Service;
  const mockUser = mockUsers[0];
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserProfileAvatarUseCase,
        {
          provide: UsersRepository,
          useValue: createMock<UsersRepository>({
            findById: vi.fn().mockResolvedValue(mockUser),
            updateProfileAvatarUrl: vi.fn().mockResolvedValue(mockUser),
          }),
        },
        {
          provide: S3Service,
          useValue: createMock<S3Service>(),
        },
      ],
    }).compile();

    usecase = module.get<UpdateUserProfileAvatarUseCase>(
      UpdateUserProfileAvatarUseCase,
    );
    usersRepository = module.get<UsersRepository>(UsersRepository);
    s3Service = module.get<S3Service>(S3Service);
  });

  it('usecase が定義されている', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('正常に実行される', async () => {
      await usecase.execute(String(mockUser.id), file);

      // TODO: s3Service.deleteFile で引数にデータが渡されているか検証する
      expect(s3Service.deleteFile).toHaveBeenCalledTimes(1);
      // TODO: s3Service.uploadFile で引数にデータが渡されているか検証する
      expect(s3Service.uploadFile).toHaveBeenCalledTimes(1);

      expect(usersRepository.updateProfileAvatarUrl).toHaveBeenCalledTimes(1);
      expect(usersRepository.updateProfileAvatarUrl).toHaveBeenCalledWith(
        expect.objectContaining({
          id: String(mockUser.id),
        }),
      );
    });
  });
});
