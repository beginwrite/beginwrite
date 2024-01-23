import { Injectable } from '@nestjs/common';
import { User } from 'src/models/users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export type CreateUserArgs = {
  name: string;
  email: string;
  userId: string;
  hash: string;
};

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepostiory: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepostiory.find();
  }

  createUser(data: CreateUserArgs): Promise<User> {
    const user = new User();
    user.email = data.email;
    user.hash = data.hash;
    user.name = data.name;
    user.userId = data.userId;
    user.createdAt = Date.now();
    user.updatedAt = Date.now();
    return this.usersRepostiory.save(user);
  }
}
