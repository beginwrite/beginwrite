import { IMutationCreatePostArgs } from '@beginwrite/app-graphql-codegen';
import { Injectable } from '@nestjs/common';
import { Post } from 'src/domains/posts/entities/posts.entity';
import { PostsRepository } from 'src/domains/posts/repositories/posts.repository';

@Injectable()
export class CreatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(args: IMutationCreatePostArgs): Promise<Post> {
    if (!args.data.title) throw new Error('Title is required');
    if (!args.data.content) throw new Error('Content is required');
    if (!args.data.userId) throw new Error('User ID is required');

    return await this.postsRepository
      .createPost({
        title: args.data.title,
        content: args.data.content,
        userId: args.data.userId,
      })
      .then((post) => {
        return post;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
