import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../../entities/posts.entity';
import { PostsRepository } from '../../repositories/posts.repository';

import { DeletePostUseCase } from './delete-post.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [DeletePostUseCase, PostsRepository],
  exports: [DeletePostUseCase, PostsRepository],
})
export class DeletePostUseCaseModule {}
