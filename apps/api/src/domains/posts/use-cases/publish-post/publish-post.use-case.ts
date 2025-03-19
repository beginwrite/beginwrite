import { IMutationPublishPostArgs } from '@beginwrite/graphql-codegen';
import { Injectable } from '@nestjs/common';
import { Post } from 'src/domains/posts/entities/posts.entity';
import { PostsRepository } from 'src/domains/posts/repositories/posts.repository';

@Injectable()
export class PublishPostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(args: IMutationPublishPostArgs): Promise<Post> {
    if (!args.id) throw new Error('Post ID is required');

    return await this.postsRepository
      .publishPost(args.id)
      .then((post) => {
        return post;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
