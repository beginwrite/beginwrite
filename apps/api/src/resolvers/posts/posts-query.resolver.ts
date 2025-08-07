import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '../../applications/guards/jwt-auth.guard';
import { Post } from '../../domains/posts/entities/posts.entity';
import { FindPostByIdUseCase } from '../../use-cases/posts/find-post-by-id/find-post-by-id.use-case';
import { FindPostsByUserIdUseCase } from '../../use-cases/posts/find-posts-by-user-id/find-posts-by-user-id.use-case';

@Resolver((of) => Post)
export class PostsQueryResolver {
  constructor(
    private findPostByIdUseCase: FindPostByIdUseCase,
    private findPostsByUserIdUseCase: FindPostsByUserIdUseCase,
  ) {}

  @Query((returns) => [Post])
  @UseGuards(JwtAuthGuard)
  async posts(@Args('userId') userId: string) {
    return await this.findPostsByUserIdUseCase.execute(userId);
  }

  @Query((returns) => Post)
  @UseGuards(JwtAuthGuard)
  async post(@Args('id') id: string) {
    return await this.findPostByIdUseCase.execute(id);
  }
}
