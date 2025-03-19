import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { FindPostsByUserIdUseCase } from 'src/domains/posts/use-cases/find-posts-by-user-id/find-posts-by-user-id.use-case';

import { JwtAuthGuard } from '../../applications/guards/jwt-auth.guard';
import { Post } from '../../domains/posts/entities/posts.entity';
import { FindPostByIdUseCase } from '../../domains/posts/use-cases/find-post-by-id/find-post-by-id.use-case';

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
