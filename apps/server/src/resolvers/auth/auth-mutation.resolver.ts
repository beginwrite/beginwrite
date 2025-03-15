import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Context } from '@nestjs/graphql';
import { User } from 'src/domains/users/entities/users.entity';
import { LoginUseCase } from 'src/use-cases/auth/login.use-case';

import { GqlAuthGuard } from '../../applications/guards/gql-auth.guard';

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
