import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '../../applications/guards/jwt-auth.guard';
import { User } from '../../models/users.model';
import { PostsRepository } from '../../repositorys/posts.repository';

@Resolver((of) => User)
export class PostsQueryResolver {
  constructor(private postsRepository: PostsRepository) {}

  @Query((returns) => User)
  @UseGuards(JwtAuthGuard)
  async users() {
    return this.postsRepository.findAll();
  }
}
