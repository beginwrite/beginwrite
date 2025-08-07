import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../../../domains/posts/entities/posts.entity';
import { PostsRepository } from '../../../domains/posts/repositories/posts.repository';

import { FindPostsByUserIdUseCase } from './find-posts-by-user-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [FindPostsByUserIdUseCase, PostsRepository],
  exports: [FindPostsByUserIdUseCase, PostsRepository],
})
export class FindPostsByUserIdUseCaseModule {}
