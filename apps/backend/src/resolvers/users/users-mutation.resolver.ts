import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { User } from 'src/models/users.model';
import { UsersRepository } from '../../repositorys/users.repository';
import * as bcrypt from 'bcrypt';
import type {
  IMutationCreateUserArgs,
  IUserInput,
} from '@beginwrite/app-graphql-codegen';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver((of) => User)
export class UsersMutationResolver {
  constructor(private usersRepository: UsersRepository) {}

  @Mutation((returns) => User)
  async createUser(@Args() args: IMutationCreateUserArgs) {
    const hash = await bcrypt.hash(args.data.password, 12);
    return this.usersRepository.createUser({
      email: args.data.email,
      hash,
      name: args.data.name,
      userId: args.data.userId,
    });
  }
}
