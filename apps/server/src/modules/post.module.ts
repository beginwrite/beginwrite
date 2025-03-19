import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindPostsByUserIdUseCase } from 'src/domains/posts/use-cases/find-posts-by-user-id.use-case';

import { Post } from '../domains/posts/entities/posts.entity';
import { PostsRepository } from '../domains/posts/repositories/posts.repository';
import { CreatePostUseCase } from '../domains/posts/use-cases/create-post.use-case';
import { DeletePostUseCase } from '../domains/posts/use-cases/delete-post.use-case';
import { DestroyPostUseCase } from '../domains/posts/use-cases/destroy-post.use-case';
import { FindPostByIdUseCase } from '../domains/posts/use-cases/find-post-by-id.use-case';
import { PublishPostUseCase } from '../domains/posts/use-cases/publish-post.use-case';
import { UpdatePostUseCase } from '../domains/posts/use-cases/update-post.use-case';
import { PostsMutationResolver } from '../resolvers/posts/posts-mutation.resolver';
import { PostsQueryResolver } from '../resolvers/posts/posts-query.resolver';

// TODO: インポートするモジュールが多いので、use-cases のモジュール化を検討する
@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [
    PostsRepository,
    PostsQueryResolver,
    PostsMutationResolver,
    FindPostByIdUseCase,
    FindPostsByUserIdUseCase,
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
