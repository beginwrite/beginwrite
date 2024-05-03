import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/models/users.model';
import { UsersRepository } from '../../repositorys/users.repository';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Resolver((of) => User)
export class UsersQueryResolver {
  constructor(private usersRepository: UsersRepository) {}

  @Query((returns) => User)
  @UseGuards(JwtAuthGuard)
  async users() {
    return this.usersRepository.findAll();
  }
}
