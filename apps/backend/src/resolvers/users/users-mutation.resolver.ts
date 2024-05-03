import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/users.model';

import { JwtAuthGuard } from '../../applications/guards/jwt-auth.guard';
import { UsersRepository } from '../../repositorys/users.repository';

import type {
  IMutationCreateUserArgs,
  IMutationUpdateUserProfileArgs,
} from '@beginwrite/app-graphql-codegen';

@Resolver((of) => User)
export class UsersMutationResolver {
  constructor(private usersRepository: UsersRepository) {}

  @Mutation((returns) => User)
  async createUser(@Args() args: IMutationCreateUserArgs) {
    if (!args.data.password) throw new Error('Password is required');
    if (!args.data.email) throw new Error('Email is required');
    if (!args.data.name) throw new Error('Name is required');

    const hash = await bcrypt.hash(args.data.password, 12);
    return this.usersRepository
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

  @Mutation((returns) => User)
  @UseGuards(JwtAuthGuard)
  async updateUserProfile(@Args() args: IMutationUpdateUserProfileArgs) {
    if (!args.data.displayName) throw new Error('Display Name is required');
    if (!args.data.id) throw new Error('User ID is required');

    return this.usersRepository
      .updateUserProfile({
        id: args.data.id,
        displayName: args.data.displayName,
        bio: args.data.bio,
        avatar: args.data.avatar,
      })
      .then(async () => {
        const user = await this.usersRepository.findById(args.data.id);
        return user;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
