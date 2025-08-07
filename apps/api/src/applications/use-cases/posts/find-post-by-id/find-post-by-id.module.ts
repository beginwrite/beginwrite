import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../../../../domains/posts/entities/posts.entity';
import { PostsRepository } from '../../../../domains/posts/repositories/posts.repository';

import { FindPostByIdUseCase } from './find-post-by-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [FindPostByIdUseCase, PostsRepository],
  exports: [FindPostByIdUseCase, PostsRepository],
})
export class FindPostByIdUseCaseModule {}
