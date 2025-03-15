import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Context } from '@nestjs/graphql';
import { AuthRepository } from 'src/domains/auth/repositories/auth.repository';
import { User } from 'src/domains/users/entities/users.entity';

import { GqlAuthGuard } from '../../applications/guards/gql-auth.guard';

import type { IMutationAuthArgs } from '@beginwrite/app-graphql-codegen';

@Resolver((of) => User)
export class AuthMutationResolver {
  constructor(private authRepository: AuthRepository) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async auth(@Args() args: IMutationAuthArgs, @Context() context) {
    return await this.authRepository.auth(context.user);
  }
}
