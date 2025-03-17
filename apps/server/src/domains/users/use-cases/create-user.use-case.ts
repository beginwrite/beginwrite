import { IMutationCreateUserArgs } from '@beginwrite/app-graphql-codegen';
import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import * as bcrypt from 'bcryptjs';

import { User } from '../entities/users.entity';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(args: IMutationCreateUserArgs): Promise<User> {
    if (!args.data.password) throw new Error('Password is required');
    if (!args.data.email) throw new Error('Email is required');
    if (!args.data.name) throw new Error('Name is required');

    const hash = await bcrypt.hash(args.data.password, 12);

    return await this.usersRepository
      .createUser({
        email: args.data.email,
        hash,
        name: args.data.name,
      })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
