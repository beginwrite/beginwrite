import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsRepository } from '../../repositories/posts.repository';

import { FindPostsByUserIdUseCase } from './find-posts-by-user-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [FindPostsByUserIdUseCase, PostsRepository],
  exports: [FindPostsByUserIdUseCase, PostsRepository],
})
export class FindPostsByUserIdUseCaseModule {}
