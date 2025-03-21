import { IUserAuthInput } from '@beginwrite/graphql-codegen';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { DataSource, Repository, UpdateResult } from 'typeorm';

import { RedisService } from 'src/applications/services/redis.service';
import { User } from 'src/domains/users/entities/users.entity';

export type AuthUserArgs = {
  email: string;
  password: string;
};

@Injectable()
export class AuthRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
    private redis: RedisService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User> {
    return await this.findOne({ where: { email } });
  }

  async updateUserAccessToken({ id, token }): Promise<UpdateResult> {
    return await this.update(
      { id: Number(id) },
      {
        accessToken: token as string,
      },
    );
  }

  async validateUser(data: IUserAuthInput): Promise<User> {
    const user = await this.findByEmail(data.email);
    if (!user)
      throw new UnauthorizedException({
        message: 'User not found',
      });
    const isPasswordValid = await bcrypt.compare(data.password, user.hash);
    if (!isPasswordValid)
      throw new UnauthorizedException({
        message: 'Invalid password',
      });
    return user;
  }

  // 認証処理の関係で、ユーザーのトークンの保存処理も実装する
  async auth(user: User): Promise<User> {
    const payload = { email: user.email, sub: user.id };
    const redisToken = await this.redis.store.get(`${user.uuid}`);
    if (!redisToken || redisToken !== user.accessToken) {
      const token = this.jwtService.sign(payload);
      await this.updateUserAccessToken({
        id: user.id,
        token,
      });
      user.accessToken = token;
      // トークンとユーザーIDをRedisに保存。有効期限は1時間
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.redis.store.set(`${user.uuid}`, token, 'EX', 60 * 60);
    }

    return user;
  }

  async authUser(id: number): Promise<User> {
    if (!id) throw new UnauthorizedException();
    const user = await this.findOne({ where: { id } });
    if (!user) throw new Error('User not found');
    if (!user.accessToken) throw new UnauthorizedException();
    return user;
  }

  async logout(user: User): Promise<User> {
    // ログアウト時にRedis&DBからトークンを削除
    await this.redis.store.del(`${user.uuid}`);
    await this.updateUserAccessToken({
      id: user.id,
      token: null,
    });
    return user;
  }
}
