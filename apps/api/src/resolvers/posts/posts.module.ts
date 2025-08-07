import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreatePostUseCaseModule } from '../../applications/use-cases/posts/create-post/create-post.module';
import { DeletePostUseCaseModule } from '../../applications/use-cases/posts/delete-post/delete-post.module';
import { DestroyPostUseCaseModule } from '../../applications/use-cases/posts/destroy-post/destory-post.module';
import { FindPostByIdUseCaseModule } from '../../applications/use-cases/posts/find-post-by-id/find-post-by-id.module';
import { FindPostsByUserIdUseCaseModule } from '../../applications/use-cases/posts/find-posts-by-user-id/find-posts-by-user-id.module';
import { PublishPostUseCaseModule } from '../../applications/use-cases/posts/publish-post/publish-post.module';
import { UpdatePostUseCaseModule } from '../../applications/use-cases/posts/update-post/update-post.module';
import { Post } from '../../domains/posts/entities/posts.entity';

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
