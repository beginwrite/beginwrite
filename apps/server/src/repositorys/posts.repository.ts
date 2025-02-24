import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/models/posts.model';
import { Repository } from 'typeorm';

export type CreatePostArgs = {
  title: string;
  content: string;
  userId: string;
};

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async createPost(data: CreatePostArgs): Promise<Post> {
    const post = new Post();

    post.title = data.title;
    post.content = data.content;
    post.userId = Number(data.userId);
    post.uuid = crypto.randomUUID();
    post.createdAt = Date.now();

    return await this.postsRepository.save(post);
  }
}
