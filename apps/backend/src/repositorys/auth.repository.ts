import { IUserAuthInput } from '@beginwrite/app-graphql-codegen';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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
    const token = this.jwtService.sign(payload);
    if (token !== user.accessToken) {
      await this.usersRepostiory.updateUserAccessToken({
        id: user.id,
        token,
      });
      user.accessToken = token;
    }
    return user;
  }
}
