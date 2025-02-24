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

  findById(id: string): Promise<Post> {
    return this.postsRepository.findOne({ where: { id: Number(id) } });
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async createPost(data: CreatePostArgs): Promise<Post> {
    const post = new Post();

    post.title = data.title;
    post.content = data.content;
    post.userId = Number(data.userId);
    post.uuid = crypto.randomUUID();
    post.createdAt = Date.now().toString();

    return await this.postsRepository.save(post);
  }

  async publishPost(id: string): Promise<Post> {
    const post = await this.findById(id);
    if (!post) throw new Error('Post not found');
    post.publishedAt = Date.now().toString();
    return await this.postsRepository.save(post);
  }

  async updatePost(data: CreatePostArgs): Promise<Post> {
    const post = await this.findById(data.userId);

    post.title = data.title;
    post.content = data.content;
    post.updatedAt = Date.now().toString();

    return await this.postsRepository.save(post);
  }

  async deletePost(id: string): Promise<Post> {
    const post = await this.findById(id);
    if (!post) throw new Error('Post not found');

    post.deletedAt = Date.now().toString();
    return await this.postsRepository.save(post);
  }
}
