import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '../../applications/guards/jwt-auth.guard';
import { Post } from '../../domains/posts/entities/posts.entity';
import { PostsRepository } from '../../domains/posts/repositories/posts.repository';
import { FindPostByIdUseCase } from '../../domains/posts/use-cases/find-post-by-id.use-case';

@Resolver((of) => Post)
export class PostsQueryResolver {
  constructor(
    private postsRepository: PostsRepository,
    private findPostByIdUseCase: FindPostByIdUseCase,
  ) {}

  @Query((returns) => [Post])
  @UseGuards(JwtAuthGuard)
  async posts() {
    return this.postsRepository.findAll();
  }

  @Query((returns) => Post)
  @UseGuards(JwtAuthGuard)
  async post(@Args('id') id: string) {
    return await this.findPostByIdUseCase.execute(id);
  }
}
