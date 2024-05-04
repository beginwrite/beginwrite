import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/models/users.model';

import { JwtAuthGuard } from '../../applications/guards/jwt-auth.guard';
import { UsersRepository } from '../../repositorys/users.repository';

@Resolver((of) => User)
export class UsersQueryResolver {
  constructor(private usersRepository: UsersRepository) {}

  @Query((returns) => User)
  @UseGuards(JwtAuthGuard)
  async users() {
    return this.usersRepository.findAll();
  }
}
