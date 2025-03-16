import { IUserAuthInput } from '@beginwrite/app-graphql-codegen';
import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RedisService } from 'src/applications/services/redis.service';
import { User } from 'src/domains/users/entities/users.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';

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
        accessToken: token,
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

  async auth(user: User) {
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
      this.redis.store.set(`${user.uuid}`, token, 'EX', 60 * 60);
    }

    return user;
  }

  async authUser(id: number) {
    if (!id) throw new UnauthorizedException();
    const user = await this.findOne({ where: { id } });
    if (!user) throw new Error('User not found');
    return user;
  }

  async logout(user: User) {
    // ログアウト時にRedis&DBからトークンを削除
    await this.redis.store.del(`${user.uuid}`);
    await this.updateUserAccessToken({
      id: user.id,
      token: null,
    });
    return user;
  }
}
