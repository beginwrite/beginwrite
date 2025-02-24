import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../models/posts.model';
import { PostsRepository } from '../repositorys/posts.repository';
import { PostsMutationResolver } from '../resolvers/posts/posts-mutation.resolver';
import { PostsQueryResolver } from '../resolvers/posts/posts-query.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsRepository, PostsQueryResolver, PostsMutationResolver],
  exports: [PostsRepository, PostsQueryResolver, PostsMutationResolver],
})
export class PostModule {}
