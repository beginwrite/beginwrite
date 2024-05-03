import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Context } from '@nestjs/graphql';
import { User } from 'src/models/users.model';
import { AuthRepository } from 'src/repositorys/auth.repository';

import { GqlAuthGuard } from '../../applications/guards/gql-auth.guard';

import type { IMutationAuthUserArgs } from '@beginwrite/app-graphql-codegen';

@Resolver((of) => User)
export class AuthMutationResolver {
  constructor(private authRepository: AuthRepository) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async authUser(@Args() args: IMutationAuthUserArgs, @Context() context) {
    return await this.authRepository.auth(context.user);
  }
}
