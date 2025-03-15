import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { FileUpload } from 'graphql-upload-minimal';
import { S3Service } from 'src/applications/services/s3.service';
import { User } from 'src/domains/users/entities/users.entity';

import type { ReadStream } from 'fs';
import type { UpdateResult, Repository } from 'typeorm';

export type CreateUserArgs = {
  name: string;
  email: string;
  hash: string;
};

export type AuthUserArgs = {
  email: string;
  password: string;
};

export type UpdateUserProfileArgs = {
  id: string;
  displayName: string;
  bio?: string;
};

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepostiory: Repository<User>,
    private s3Service: S3Service,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepostiory.find();
  }

  findById(id: string): Promise<User> {
    return this.usersRepostiory.findOne({ where: { id: Number(id) } });
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepostiory.findOne({ where: { email } });
  }

  async createUser(data: CreateUserArgs): Promise<User> {
    const user = new User();
    user.uuid = crypto.randomUUID();
    user.email = data.email;
    user.hash = data.hash;
    user.name = data.name;
    user.displayName = data.name;
    user.createdAt = Date.now().toString();
    user.updatedAt = Date.now().toString();
    return await this.usersRepostiory.save(user);
  }

  async updateUserProfile(data: UpdateUserProfileArgs): Promise<UpdateResult> {
    return await this.usersRepostiory.update(
      { id: Number(data.id) },
      {
        displayName: data.displayName,
        bio: data.bio,
        updatedAt: Date.now().toString(),
      },
    );
  }

  async updateUserAccessToken({ id, token }): Promise<UpdateResult> {
    return await this.usersRepostiory.update(
      { id: Number(id) },
      {
        accessToken: token,
      },
    );
  }

  // 型定義すると file データが取れないので、any にしている
  async uploadProfileAvatar(
    file: any,
    id: number,
    avatar: string,
  ): Promise<UpdateResult> {
    const { createReadStream } = file.file;
    // MEMO: 拡張子は png に固定
    const uuid = crypto.randomUUID();
    const filename = `${uuid}.png`;
    const stream = await this.loadStream(createReadStream());
    // 前の画像を削除
    if (avatar) {
      const oldFilename = avatar.split('/').pop();
      await this.s3Service.deleteFile(oldFilename);
    }
    await this.s3Service.uploadFile(filename, stream);
    return await this.usersRepostiory.update(
      { id: id },
      {
        avatar: `${process.env.AWS_S3_URL}/${filename}`,
        updatedAt: Date.now().toString(),
      },
    );
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
