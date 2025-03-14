import { Injectable } from '@nestjs/common';

import { Post } from '../../domains/posts/entities/posts.entity';
import { PostsRepository } from '../../domains/posts/repositories/posts.repository';

@Injectable()
export class FindPostByIdUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(id: string): Promise<Post> {
    if (!id) throw new Error('Post ID is required');

    return await this.postsRepository
      .findById(id)
      .then((post) => {
        return post;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
