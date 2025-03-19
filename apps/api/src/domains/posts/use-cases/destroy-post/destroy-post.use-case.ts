import { IMutationDestroyPostArgs } from '@beginwrite/graphql-codegen';
import { Injectable } from '@nestjs/common';
import { Post } from 'src/domains/posts/entities/posts.entity';
import { PostsRepository } from 'src/domains/posts/repositories/posts.repository';

@Injectable()
export class DestroyPostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(args: IMutationDestroyPostArgs): Promise<Post> {
    if (!args.id) throw new Error('Post ID is required');

    return await this.postsRepository
      .destroyPost(args.id)
      .then((post) => {
        return post;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
