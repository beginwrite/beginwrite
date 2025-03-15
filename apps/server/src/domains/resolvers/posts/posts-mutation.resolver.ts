import {
  IMutationCreatePostArgs,
  IMutationDeletePostArgs,
  IMutationPublishPostArgs,
  IMutationUpdatePostArgs,
} from '@beginwrite/app-graphql-codegen';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '../../../applications/guards/jwt-auth.guard';
import { CreatePostUseCase } from '../../../use-cases/posts/create-post.use-case';
import { DeletePostUseCase } from '../../../use-cases/posts/delete-post.use-case';
import { DestroyPostUseCase } from '../../../use-cases/posts/destroy-post.use-case';
import { PublishPostUseCase } from '../../../use-cases/posts/publish-post.use-case';
import { UpdatePostUseCase } from '../../../use-cases/posts/update-post.use-case';
import { Post } from '../../posts/entities/posts.entity';

@Resolver((of) => Post)
export class PostsMutationResolver {
  constructor(
    private createPostUseCase: CreatePostUseCase,
    private publishPostUseCase: PublishPostUseCase,
    private updatePostUseCase: UpdatePostUseCase,
    private deletePostUseCase: DeletePostUseCase,
    private destroyPostUseCase: DestroyPostUseCase,
  ) {}

  @Mutation((returns) => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(@Args() args: IMutationCreatePostArgs) {
    return await this.createPostUseCase.execute(args);
  }

  @Mutation((returns) => Post)
  @UseGuards(JwtAuthGuard)
  async publishPost(@Args() args: IMutationPublishPostArgs) {
    return await this.publishPostUseCase.execute(args);
  }

  @Mutation((returns) => Post)
  @UseGuards(JwtAuthGuard)
  async updatePost(@Args() args: IMutationUpdatePostArgs) {
    return await this.updatePostUseCase.execute(args);
  }

  @Mutation((returns) => Post)
  @UseGuards(JwtAuthGuard)
  async deletePost(@Args() args: IMutationDeletePostArgs) {
    return await this.deletePostUseCase.execute(args);
  }

  @Mutation((returns) => Post)
  @UseGuards(JwtAuthGuard)
  async destroyPost(@Args() args: IMutationDeletePostArgs) {
    return await this.destroyPostUseCase.execute(args);
  }
}
