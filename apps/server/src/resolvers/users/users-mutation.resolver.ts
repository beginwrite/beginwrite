import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { User } from 'src/domains/users/entities/users.entity';
import { CreateUserUseCase } from 'src/use-cases/users/create-user.use-case';
import { UpdateUserProfileAvatarUseCase } from 'src/use-cases/users/update-user-profile-avatar.use-case';
import { UpdateUserProfileUseCase } from 'src/use-cases/users/update-user-profile.use-case';

import { JwtAuthGuard } from '../../applications/guards/jwt-auth.guard';

import type {
  IMutationCreateUserArgs,
  IMutationUpdateUserProfileArgs,
} from '@beginwrite/app-graphql-codegen';

@Resolver((of) => User)
export class UsersMutationResolver {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateUserProfileUseCase: UpdateUserProfileUseCase,
    private updateProfileAvatarUseCase: UpdateUserProfileAvatarUseCase,
  ) {}

  @Mutation((returns) => User)
  async createUser(@Args() args: IMutationCreateUserArgs) {
    return await this.createUserUseCase.execute(args);
  }

  @Mutation((returns) => User)
  @UseGuards(JwtAuthGuard)
  async updateUserProfile(@Args() args: IMutationUpdateUserProfileArgs) {
    return await this.updateUserProfileUseCase.execute(args);
  }

  @Mutation((returns) => User)
  @UseGuards(JwtAuthGuard)
  async uploadProfileAvatar(
    @Args({ name: 'id', type: () => String }) id: string,
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return await this.updateProfileAvatarUseCase.execute(id, file);
  }
}
