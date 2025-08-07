import {
  IMutationCreatePostArgs,
  IMutationDeletePostArgs,
  IMutationPublishPostArgs,
  IMutationUpdatePostArgs,
} from '@beginwrite/graphql-codegen';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreatePostUseCase } from '../../applications/use-cases/posts/create-post/create-post.use-case';
import { DeletePostUseCase } from '../../applications/use-cases/posts/delete-post/delete-post.use-case';
import { DestroyPostUseCase } from '../../applications/use-cases/posts/destroy-post/destroy-post.use-case';
import { PublishPostUseCase } from '../../applications/use-cases/posts/publish-post/publish-post.use-case';
import { UpdatePostUseCase } from '../../applications/use-cases/posts/update-post/update-post.use-case';
import { Post } from '../../domains/posts/entities/posts.entity';
import { JwtAuthGuard } from '../../infrastructure/guards/jwt-auth.guard';

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
