import { UUID } from 'crypto';

import { IUserAuthInput } from '@beginwrite/app-graphql-codegen';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/applications/services/redis.service';
import { User } from 'src/models/users.model';

import { UsersRepository } from './users.repository';

export type AuthUserArgs = {
  email: string;
  password: string;
};

@Injectable()
export class AuthRepository {
  constructor(
    private usersRepostiory: UsersRepository,
    private jwtService: JwtService,
    private redis: RedisService,
  ) {}

  findByEmail(email: string): Promise<User> {
    return this.usersRepostiory.findByEmail(email);
  }

  async validateUser(data: IUserAuthInput): Promise<User> {
    const user = await this.findByEmail(data.email);
    if (!user) throw new Error('User not found');
    const isPasswordValid = await bcrypt.compare(data.password, user.hash);
    if (!isPasswordValid) throw new Error('Invalid password');
    return user;
  }

  async auth(user: User) {
    const payload = { email: user.email, sub: user.id };
    const redisToken = await this.redis.store.get(`${user.uuid}`);
    if (!redisToken || redisToken !== user.accessToken) {
      const token = this.jwtService.sign(payload);
      await this.usersRepostiory.updateUserAccessToken({
        id: user.id,
        token,
      });
      user.accessToken = token;
      // トークンとユーザーIDをRedisに保存。有効期限は1時間
      this.redis.store.set(`${user.uuid}`, token, 'EX', 60 * 60);
    }

    return user;
  }

  async authUser(id: number) {
    const user = await this.usersRepostiory.findById(String(id));
    if (!user) throw new Error('User not found');
    return user;
  }

  async logout(user: User) {
    // ログアウト時にRedis&DBからトークンを削除
    await this.redis.store.del(`${user.uuid}`);
    await this.usersRepostiory.updateUserAccessToken({
      id: user.id,
      token: null,
    });
    return user;
  }
}
