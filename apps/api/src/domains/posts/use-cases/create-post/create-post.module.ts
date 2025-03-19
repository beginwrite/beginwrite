import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../../entities/posts.entity';
import { PostsRepository } from '../../repositories/posts.repository';

import { CreatePostUseCase } from './create-post.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [CreatePostUseCase, PostsRepository],
  exports: [CreatePostUseCase, PostsRepository],
})
export class CreatePostUseCaseModule {}
