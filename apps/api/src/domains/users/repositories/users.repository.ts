import { Injectable } from '@nestjs/common';
import { UpdateResult, Repository, DataSource } from 'typeorm';

import { User } from 'src/domains/users/entities/users.entity';

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

export type UpdateUserProfileAvatarArgs = {
  filename: string;
  id: string;
};

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findAll(): Promise<User[]> {
    return await this.find();
  }

  async findById(id: string): Promise<User> {
    return await this.findOne({ where: { id: Number(id) } });
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
    return await this.save(user);
  }

  async updateUserProfile(data: UpdateUserProfileArgs): Promise<User> {
    await this.update(
      { id: Number(data.id) },
      {
        displayName: data.displayName,
        bio: data.bio,
        updatedAt: Date.now().toString(),
      },
    );

    return await this.findById(data.id);
  }

  async updateProfileAvatarUrl(
    data: UpdateUserProfileAvatarArgs,
  ): Promise<UpdateResult> {
    const { filename, id } = data;

    return await this.update(
      { id: Number(id) },
      {
        avatar: `${process.env.AWS_S3_URL}/${filename}`,
        updatedAt: Date.now().toString(),
      },
    );
  }
}
