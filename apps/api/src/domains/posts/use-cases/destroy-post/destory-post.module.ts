import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../../entities/posts.entity';
import { PostsRepository } from '../../repositories/posts.repository';

import { DestroyPostUseCase } from './destroy-post.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [DestroyPostUseCase, PostsRepository],
  exports: [DestroyPostUseCase, PostsRepository],
})
export class DestroyPostUseCaseModule {}
