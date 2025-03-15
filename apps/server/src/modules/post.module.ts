import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../domains/posts/entities/posts.entity';
import { PostsRepository } from '../domains/posts/repositories/posts.repository';
import { PostsMutationResolver } from '../resolvers/posts/posts-mutation.resolver';
import { PostsQueryResolver } from '../resolvers/posts/posts-query.resolver';
import { CreatePostUseCase } from '../use-cases/posts/create-post.use-case';
import { DeletePostUseCase } from '../use-cases/posts/delete-post.use-case';
import { DestroyPostUseCase } from '../use-cases/posts/destroy-post.use-case';
import { FindPostByIdUseCase } from '../use-cases/posts/find-post-by-id.use-case';
import { PublishPostUseCase } from '../use-cases/posts/publish-post.use-case';
import { UpdatePostUseCase } from '../use-cases/posts/update-post.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [
    PostsRepository,
    PostsQueryResolver,
    PostsMutationResolver,
    FindPostByIdUseCase,
    CreatePostUseCase,
    UpdatePostUseCase,
    PublishPostUseCase,
    DeletePostUseCase,
    DestroyPostUseCase,
  ],
  exports: [
    PostsRepository,
    PostsQueryResolver,
    PostsMutationResolver,
    FindPostByIdUseCase,
    CreatePostUseCase,
    UpdatePostUseCase,
    PublishPostUseCase,
    DeletePostUseCase,
    DestroyPostUseCase,
  ],
})
export class PostModule {}
