import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatePostUseCaseModule } from 'src/domains/posts/use-cases/create-post/create-post.module';
import { DeletePostUseCaseModule } from 'src/domains/posts/use-cases/delete-post/delete-post.module';
import { DestroyPostUseCaseModule } from 'src/domains/posts/use-cases/destroy-post/destory-post.module';
import { FindPostByIdUseCaseModule } from 'src/domains/posts/use-cases/find-post-by-id/find-post-by-id.module';
import { FindPostsByUserIdUseCaseModule } from 'src/domains/posts/use-cases/find-posts-by-user-id/find-posts-by-user-id.module';
import { PublishPostUseCaseModule } from 'src/domains/posts/use-cases/publish-post/publish-post.module';
import { UpdatePostUseCaseModule } from 'src/domains/posts/use-cases/update-post/update-post.module';

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
