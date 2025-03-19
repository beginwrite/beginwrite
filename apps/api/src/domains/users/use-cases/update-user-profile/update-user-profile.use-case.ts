import { IMutationUpdateUserProfileArgs } from '@beginwrite/app-graphql-codegen';
import { Injectable } from '@nestjs/common';
import { User } from 'src/domains/users/entities/users.entity';
import { UsersRepository } from 'src/domains/users/repositories/users.repository';

@Injectable()
export class UpdateUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(args: IMutationUpdateUserProfileArgs): Promise<User> {
    if (!args.data.displayName) throw new Error('Display Name is required');
    if (!args.data.id) throw new Error('User ID is required');

    return await this.usersRepository
      .updateUserProfile({
        id: args.data.id,
        displayName: args.data.displayName,
        bio: args.data.bio,
      })
      .then(async () => {
        return await this.usersRepository.findById(args.data.id);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
