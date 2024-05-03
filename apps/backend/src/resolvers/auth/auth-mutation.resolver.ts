import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { Context } from '@nestjs/graphql';
import { User } from 'src/models/users.model';
import type { IMutationAuthUserArgs } from '@beginwrite/app-graphql-codegen';
import { AuthRepository } from 'src/repositorys/auth.repository';
import { JwtService } from '@nestjs/jwt';

@Resolver((of) => User)
export class AuthMutationResolver {
  constructor(private authRepository: AuthRepository) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async authUser(@Args() args: IMutationAuthUserArgs, @Context() context) {
    return await this.authRepository.auth(context.user);
  }
}
