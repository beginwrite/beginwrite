import { IMutationUpdateUserProfileArgs } from '@beginwrite/graphql-codegen';
import { Injectable } from '@nestjs/common';

import { User } from '../../../../domains/users/entities/users.entity';
import { UsersRepository } from '../../../../domains/users/repositories/users.repository';

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
      .then((data) => {
        return data;
      })
      .catch(({ message }) => {
        throw new Error(message as string);
      });
  }
}
