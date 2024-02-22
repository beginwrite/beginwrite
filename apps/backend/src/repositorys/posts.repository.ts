import { Injectable } from '@nestjs/common';
import { User } from 'src/models/users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '@prisma/client';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(User)
    private postsRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }
}
