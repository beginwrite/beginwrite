import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';

import { GqlAuthGuard } from '../../applications/guards/gql-auth.guard';
import { User } from '../../domains/users/entities/users.entity';
import { LoginUseCase } from '../../use-cases/users/login/login.use-case';

import type { IMutationAuthArgs } from '@beginwrite/graphql-codegen';

@Resolver((of) => User)
export class AuthMutationResolver {
  constructor(private loginUseCase: LoginUseCase) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async auth(
    @Args() args: IMutationAuthArgs,
    @Context() { user }: { user: User },
  ) {
    return await this.loginUseCase.execute(user);
  }
}
