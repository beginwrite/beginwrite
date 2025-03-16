import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/domains/posts/entities/posts.entity';
import { DataSource, Repository } from 'typeorm';

export type CreatePostArgs = {
  title: string;
  content: string;
  userId: string;
};

@Injectable()
export class PostsRepository extends Repository<Post> {
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  findById(id: string): Promise<Post> {
    return this.findOne({ where: { id: Number(id) } });
  }

  findAll(): Promise<Post[]> {
    return this.find();
  }

  async createPost(data: CreatePostArgs): Promise<Post> {
    const post = new Post();

    post.title = data.title;
    post.content = data.content;
    post.userId = Number(data.userId);
    post.uuid = crypto.randomUUID();
    post.createdAt = Date.now().toString();

    return await this.save(post);
  }

  async publishPost(id: string): Promise<Post> {
    const post = await this.findById(id);
    if (!post) throw new Error('Post not found');
    post.publishedAt = Date.now().toString();
    return await this.save(post);
  }

  async updatePost(data: CreatePostArgs & { id: string }): Promise<Post> {
    const post = await this.findById(data.id);
    if (!post) throw new Error('Post not found');

    post.title = data.title;
    post.content = data.content;
    post.updatedAt = Date.now().toString();

    return await this.save(post);
  }

  async deletePost(id: string): Promise<Post> {
    const post = await this.findById(id);
    if (!post) throw new Error('Post not found');

    post.deletedAt = Date.now().toString();
    return await this.save(post);
  }

  async destroyPost(id: string): Promise<Post> {
    const post = await this.findById(id);
    if (!post) throw new Error('Post not found');

    await this.delete({ id: Number(id) });
    return post;
  }
}
