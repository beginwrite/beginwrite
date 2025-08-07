import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../../../domains/posts/entities/posts.entity';
import { PostsRepository } from '../../../domains/posts/repositories/posts.repository';

import { PublishPostUseCase } from './publish-post.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PublishPostUseCase, PostsRepository],
  exports: [PublishPostUseCase, PostsRepository],
})
export class PublishPostUseCaseModule {}
