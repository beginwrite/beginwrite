import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Context } from '@nestjs/graphql';

import { GqlAuthGuard } from '../../applications/guards/gql-auth.guard';
import { User } from '../../domains/users/entities/users.entity';
import { LoginUseCase } from '../../domains/users/use-cases/login.use-case';

import type { IMutationAuthArgs } from '@beginwrite/app-graphql-codegen';

@Resolver((of) => User)
export class AuthMutationResolver {
  constructor(private loginUseCase: LoginUseCase) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async auth(@Args() args: IMutationAuthArgs, @Context() context) {
    return await this.loginUseCase.execute(context.user);
  }
}
