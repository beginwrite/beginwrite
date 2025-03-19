import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsRepository } from '../../repositories/posts.repository';

import { FindPostByIdUseCase } from './find-post-by-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [FindPostByIdUseCase, PostsRepository],
  exports: [FindPostByIdUseCase, PostsRepository],
})
export class FindPostByIdUseCaseModule {}
