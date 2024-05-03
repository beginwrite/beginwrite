import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/users.model';

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
  avatar?: string;
};

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepostiory: Repository<User>,
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

  createUser(data: CreateUserArgs): Promise<User> {
    const user = new User();
    user.uuid = crypto.randomUUID();
    user.email = data.email;
    user.hash = data.hash;
    user.name = data.name;
    user.createdAt = Date.now();
    user.updatedAt = Date.now();
    return this.usersRepostiory.save(user);
  }

  async authUser(data: AuthUserArgs): Promise<User> {
    const user = await this.findByEmail(data.email);
    if (!user) throw new Error('User not found');
    const isPasswordValid = await bcrypt.compare(data.password, user.hash);
    if (!isPasswordValid) throw new Error('Invalid password');
    return user;
  }

  updateUserProfile(data: UpdateUserProfileArgs): Promise<UpdateResult> {
    return this.usersRepostiory.update(
      { id: Number(data.id) },
      {
        displayName: data.displayName,
        bio: data.bio,
        avatar: data.avatar,
        updatedAt: Date.now(),
      },
    );
  }

  updateUserAccessToken({ id, token }): Promise<UpdateResult> {
    return this.usersRepostiory.update(
      { id: Number(id) },
      {
        accessToken: token,
      },
    );
  }
}
