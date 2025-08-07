import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';

import { GqlAuthGuard } from '../../applications/guards/gql-auth.guard';
import { LoginUseCase } from '../../applications/use-cases/users/login/login.use-case';
import { User } from '../../domains/users/entities/users.entity';

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
