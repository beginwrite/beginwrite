import { Injectable } from '@nestjs/common';
import { User } from 'src/models/users.model';
import { InjectRepository } from '@nestjs/typeorm';
import type { UpdateResult, Repository } from 'typeorm';

export type CreateUserArgs = {
  name: string;
  email: string;
  hash: string;
};

export type UpdateUserProfileArgs = {
  id: string;
  displayName: string;
  bio?: string;
  avatar?: string;
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

  findById(id: string): Promise<User> {
    return this.usersRepostiory.findOne({ where: { id: Number(id) } });
  }

  createUser(data: CreateUserArgs): Promise<User> {
    const user = new User();
    user.email = data.email;
    user.hash = data.hash;
    user.name = data.name;
    user.createdAt = Date.now();
    user.updatedAt = Date.now();
    return this.usersRepostiory.save(user);
  }

  updateUserProfile(data: UpdateUserProfileArgs): Promise<UpdateResult> {
    return this.usersRepostiory.update(
      { id: Number(data.id) },
      {
        displayName: data.displayName,
        bio: data.bio,
        avatar: data.avatar,
        updatedAt: Date.now(),
      },
    );
  }
}
