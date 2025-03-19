import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsRepository } from '../../repositories/posts.repository';

import { UpdatePostUseCase } from './update-post.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [UpdatePostUseCase, PostsRepository],
  exports: [UpdatePostUseCase, PostsRepository],
})
export class UpdatePostUseCaseModule {}
