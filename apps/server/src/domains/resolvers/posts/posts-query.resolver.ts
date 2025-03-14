import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '../../../applications/guards/jwt-auth.guard';
import { Post } from '../../entities/posts.entity';
import { User } from '../../entities/users.entity';
import { PostsRepository } from '../../repositorys/posts.repository';

@Resolver((of) => User)
export class PostsQueryResolver {
  constructor(private postsRepository: PostsRepository) {}

  @Query((returns) => User)
  @UseGuards(JwtAuthGuard)
  async posts() {
    return this.postsRepository.findAll();
  }

  @Query((returns) => Post)
  @UseGuards(JwtAuthGuard)
  async post(@Args('id') id: string) {
    if (!id) throw new Error('Post ID is required');

    return await this.postsRepository
      .findById(id)
      .then((post) => {
        if (!post) throw new Error('Post not found');
        return post;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
