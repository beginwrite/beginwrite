import { IQueryUserArgs } from '@beginwrite/app-graphql-codegen';
import { Injectable } from '@nestjs/common';
import { User } from 'src/domains/users/entities/users.entity';
import { UsersRepository } from 'src/domains/users/repositories/users.repository';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: IQueryUserArgs['id']): Promise<User> {
    return this.usersRepository.findById(id);
  }
}
