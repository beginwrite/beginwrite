import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-minimal';

import { S3Service } from 'src/applications/services/s3.service';
import { User } from 'src/domains/users/entities/users.entity';
import { UsersRepository } from 'src/domains/users/repositories/users.repository';

import type { ReadStream } from 'fs';
import type { UpdateResult } from 'typeorm';

@Injectable()
export class UpdateUserProfileAvatarUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private s3Service: S3Service,
  ) {}

  async execute(id: string, file: { file: FileUpload }): Promise<User> {
    if (!file) throw new Error('File is required');
    const user = await this.usersRepository.findById(id);

    const uuid = crypto.randomUUID();
    const filename = `${uuid}.png`;

    // 前の画像を削除
    if (user.avatar) {
      const oldFilename = user.avatar.split('/').pop();
      await this.s3Service.deleteFile(oldFilename);
    }

    await this.s3Service.uploadFile({
      file: file.file,
      filename,
    });

    return await this.usersRepository
      .updateProfileAvatarUrl({ filename, id })
      .then(async () => {
        return await this.usersRepository.findById(id);
      })
      .catch(({ message }) => {
        throw new Error(message as string);
      });
  }
}
