import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from 'src/models/user-profiles.model';

export type CreateUserArgs = {
  name: string;
  email: string;
  hash: string;
};

type UserProfileArgs = {
  id: number;
};

@Injectable()
export class UserProfileRepository {
  constructor(
    @InjectRepository(UserProfile)
    private usersRepostiory: Repository<UserProfile>,
  ) {}

  findbyId({ id }: UserProfileArgs): Promise<UserProfile> {
    return this.usersRepostiory.findOne({ where: { id } });
  }
}
