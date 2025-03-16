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

  async execute(id: string, file: { file: FileUpload }): Promise<UpdateResult> {
    if (!file) throw new Error('File is required');
    const user = await this.usersRepository.findById(id);

    const { createReadStream } = file.file;
    // MEMO: 拡張子は png に固定
    const uuid = crypto.randomUUID();
    const filename = `${uuid}.png`;
    const stream = await this.loadStream(createReadStream());

    // 前の画像を削除
    if (user.avatar) {
      const oldFilename = user.avatar.split('/').pop();
      await this.s3Service.deleteFile(oldFilename);
    }

    await this.s3Service.uploadFile(filename, stream);

    return await this.usersRepository
      .updateProfileAvatarUrl(filename, id)
      .then(async (user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.message);
      });
  }

  private loadStream(stream: ReadStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}
