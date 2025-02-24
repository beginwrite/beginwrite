import {
  IMutationCreatePostArgs,
  IMutationDeletePostArgs,
  IMutationPublishPostArgs,
  IMutationUpdatePostArgs,
} from '@beginwrite/app-graphql-codegen';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '../../applications/guards/jwt-auth.guard';
import { Post } from '../../models/posts.model';
import { PostsRepository } from '../../repositorys/posts.repository';

@Resolver((of) => Post)
export class PostsMutationResolver {
  constructor(private postsRepository: PostsRepository) {}

  @Mutation((returns) => Post)
  // @UseGuards(JwtAuthGuard)
  async createPost(@Args() args: IMutationCreatePostArgs) {
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

  @Mutation((returns) => Post)
  // @UseGuards(JwtAuthGuard)
  async publishPost(@Args() args: IMutationPublishPostArgs) {
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

  @Mutation((returns) => Post)
  @UseGuards(JwtAuthGuard)
  async updatePost(@Args() args: IMutationUpdatePostArgs) {
    if (!args.data.title) throw new Error('Title is required');
    if (!args.data.content) throw new Error('Content is required');
    if (!args.data.userId) throw new Error('User ID is required');

    return await this.postsRepository
      .updatePost({
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

  @Mutation((returns) => Post)
  // @UseGuards(JwtAuthGuard)
  async deletePost(@Args() args: IMutationDeletePostArgs) {
    if (!args.id) throw new Error('Post ID is required');

    return await this.postsRepository
      .deletePost(args.id)
      .then((post) => {
        return post;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
