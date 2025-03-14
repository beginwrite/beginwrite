import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../domains/entities/posts.entity';
import { PostsRepository } from '../domains/repositorys/posts.repository';
import { PostsMutationResolver } from '../domains/resolvers/posts/posts-mutation.resolver';
import { PostsQueryResolver } from '../domains/resolvers/posts/posts-query.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsRepository, PostsQueryResolver, PostsMutationResolver],
  exports: [PostsRepository, PostsQueryResolver, PostsMutationResolver],
})
export class PostModule {}
