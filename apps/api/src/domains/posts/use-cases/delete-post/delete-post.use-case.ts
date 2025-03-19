import { IMutationDeletePostArgs } from '@beginwrite/graphql-codegen';
import { Injectable } from '@nestjs/common';

import { Post } from 'src/domains/posts/entities/posts.entity';
import { PostsRepository } from 'src/domains/posts/repositories/posts.repository';

@Injectable()
export class DeletePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(args: IMutationDeletePostArgs): Promise<Post> {
    if (!args.id) throw new Error('Post ID is required');

    return await this.postsRepository
      .deletePost(args.id)
      .then((post) => {
        return post;
      })
      .catch(({ message }) => {
        throw new Error(message as string);
      });
  }
}
