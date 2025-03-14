import { IQueryUserArgs } from '@beginwrite/app-graphql-codegen';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
import { User } from 'src/domains/entities/users.entity';

import { JwtAuthGuard } from '../../../applications/guards/jwt-auth.guard';
import { UsersRepository } from '../../repositorys/users.repository';

@Resolver((of) => User)
export class UsersQueryResolver {
  constructor(private usersRepository: UsersRepository) {}

  @Query((returns) => User)
  @UseGuards(JwtAuthGuard)
  async users() {
    return this.usersRepository.findAll();
  }

  @Query((returns) => User)
  @UseGuards(JwtAuthGuard)
  async user(@Args('id') id: IQueryUserArgs['id']) {
    return this.usersRepository.findById(id);
  }
}
