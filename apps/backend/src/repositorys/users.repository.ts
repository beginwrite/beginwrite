import { Injectable } from '@nestjs/common';
import { User } from 'src/models/users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepostiory: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepostiory.find();
  }

  createUser(name: string): Promise<User> {
    const user = new User();
    user.name = name;
    return this.usersRepostiory.save(user);
  }
}
