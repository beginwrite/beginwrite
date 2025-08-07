import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../../../../domains/entities/posts.entity';
import { PostsRepository } from '../../../../infrastructure/repositories/posts.repository';

import { UpdatePostUseCase } from './update-post.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [UpdatePostUseCase, PostsRepository],
  exports: [UpdatePostUseCase, PostsRepository],
})
export class UpdatePostUseCaseModule {}
