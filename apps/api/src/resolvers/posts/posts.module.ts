import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../../domains/posts/entities/posts.entity';
import { CreatePostUseCaseModule } from '../../use-cases/posts/create-post/create-post.module';
import { DeletePostUseCaseModule } from '../../use-cases/posts/delete-post/delete-post.module';
import { DestroyPostUseCaseModule } from '../../use-cases/posts/destroy-post/destory-post.module';
import { FindPostByIdUseCaseModule } from '../../use-cases/posts/find-post-by-id/find-post-by-id.module';
import { FindPostsByUserIdUseCaseModule } from '../../use-cases/posts/find-posts-by-user-id/find-posts-by-user-id.module';
import { PublishPostUseCaseModule } from '../../use-cases/posts/publish-post/publish-post.module';
import { UpdatePostUseCaseModule } from '../../use-cases/posts/update-post/update-post.module';

import { PostsMutationResolver } from './posts-mutation.resolver';
import { PostsQueryResolver } from './posts-query.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CreatePostUseCaseModule,
    UpdatePostUseCaseModule,
    PublishPostUseCaseModule,
    DeletePostUseCaseModule,
    DestroyPostUseCaseModule,
    FindPostsByUserIdUseCaseModule,
    FindPostByIdUseCaseModule,
  ],
  providers: [PostsQueryResolver, PostsMutationResolver],
  exports: [PostsQueryResolver, PostsMutationResolver],
})
export class PostsModule {}
