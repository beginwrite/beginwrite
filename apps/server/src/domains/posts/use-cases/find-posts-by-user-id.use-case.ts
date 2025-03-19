import { Injectable } from '@nestjs/common';

import { Post } from '../entities/posts.entity';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class FindPostsByUserIdUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(userId: string): Promise<Post[]> {
    if (!userId) throw new Error('User ID is required');

    return await this.postsRepository
      .findByUserId(userId)
      .then((posts) => {
        return posts;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
