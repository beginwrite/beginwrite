import { IQueryUserArgs } from '@beginwrite/graphql-codegen';
import { Injectable } from '@nestjs/common';

import { User } from '../../../domains/users/entities/users.entity';
import { UsersRepository } from '../../../domains/users/repositories/users.repository';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: IQueryUserArgs['id']): Promise<User> {
    return await this.usersRepository.findById(id);
  }
}
