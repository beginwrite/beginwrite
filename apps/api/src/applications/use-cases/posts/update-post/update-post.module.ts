import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../../../../domains/posts/entities/posts.entity';
import { PostsRepository } from '../../../../domains/posts/repositories/posts.repository';

import { UpdatePostUseCase } from './update-post.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [UpdatePostUseCase, PostsRepository],
  exports: [UpdatePostUseCase, PostsRepository],
})
export class UpdatePostUseCaseModule {}
