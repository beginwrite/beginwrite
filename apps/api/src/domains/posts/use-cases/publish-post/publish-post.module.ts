import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsRepository } from '../../repositories/posts.repository';

import { PublishPostUseCase } from './publish-post.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PublishPostUseCase, PostsRepository],
  exports: [PublishPostUseCase, PostsRepository],
})
export class PublishPostUseCaseModule {}
