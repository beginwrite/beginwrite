import {
  IMutationCreatePostArgs,
  IMutationDeletePostArgs,
  IMutationPublishPostArgs,
  IMutationUpdatePostArgs,
} from '@beginwrite/app-graphql-codegen';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '../../applications/guards/jwt-auth.guard';
import { Post } from '../../domains/posts/entities/posts.entity';
import { CreatePostUseCase } from '../../domains/posts/use-cases/create-post.use-case';
import { DeletePostUseCase } from '../../domains/posts/use-cases/delete-post.use-case';
import { DestroyPostUseCase } from '../../domains/posts/use-cases/destroy-post.use-case';
import { PublishPostUseCase } from '../../domains/posts/use-cases/publish-post.use-case';
import { UpdatePostUseCase } from '../../domains/posts/use-cases/update-post.use-case';

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
