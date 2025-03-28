import { IMutationUpdatePostArgs } from '@beginwrite/graphql-codegen';
import { Injectable } from '@nestjs/common';

import { Post } from 'src/domains/posts/entities/posts.entity';
import { PostsRepository } from 'src/domains/posts/repositories/posts.repository';

@Injectable()
export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(args: IMutationUpdatePostArgs): Promise<Post> {
    if (!args.id) throw new Error('Post ID is required');
    if (!args.data.title) throw new Error('Title is required');
    if (!args.data.content) throw new Error('Content is required');
    if (!args.data.userId) throw new Error('User ID is required');

    return await this.postsRepository
      .updatePost({
        id: args.id,
        title: args.data.title,
        content: args.data.content,
        userId: args.data.userId,
      })
      .then((post) => {
        return post;
      })
      .catch(({ message }) => {
        throw new Error(message as string);
      });
  }
}
