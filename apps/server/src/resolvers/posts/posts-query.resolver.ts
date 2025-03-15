import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '../../applications/guards/jwt-auth.guard';
import { User } from '../../domains/entities/users.entity';
import { Post } from '../../domains/posts/entities/posts.entity';
import { PostsRepository } from '../../domains/posts/repositories/posts.repository';
import { FindPostByIdUseCase } from '../../use-cases/posts/find-post-by-id.use-case';

@Resolver((of) => User)
export class PostsQueryResolver {
  constructor(
    private postsRepository: PostsRepository,
    private findPostByIdUseCase: FindPostByIdUseCase,
  ) {}

  // TODO: テスト用なので、追々削除する
  @Query((returns) => User)
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
