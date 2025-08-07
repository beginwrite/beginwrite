import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';

import { JwtAuthGuard } from '../../applications/guards/jwt-auth.guard';
import { CreateUserUseCase } from '../../applications/use-cases/users/create-user/create-user.use-case';
import { UpdateUserProfileUseCase } from '../../applications/use-cases/users/update-user-profile/update-user-profile.use-case';
import { UpdateUserProfileAvatarUseCase } from '../../applications/use-cases/users/update-user-profile-avatar/update-user-profile-avatar.use-case';
import { User } from '../../domains/users/entities/users.entity';

import type {
  IMutationCreateUserArgs,
  IMutationUpdateUserProfileArgs,
} from '@beginwrite/graphql-codegen';

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
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: { file: FileUpload },
  ) {
    return await this.updateProfileAvatarUseCase.execute(id, file);
  }
}
