import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../../../domains/posts/entities/posts.entity';
import { PostsRepository } from '../../../domains/posts/repositories/posts.repository';

import { DestroyPostUseCase } from './destroy-post.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [DestroyPostUseCase, PostsRepository],
  exports: [DestroyPostUseCase, PostsRepository],
})
export class DestroyPostUseCaseModule {}
