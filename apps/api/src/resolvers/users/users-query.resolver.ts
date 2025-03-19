import { IQueryUserArgs } from '@beginwrite/graphql-codegen';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver, Args } from '@nestjs/graphql';

import { User } from 'src/domains/users/entities/users.entity';
import { FindUserByIdUseCase } from 'src/domains/users/use-cases/find-user-by-id/find-user-by-id.use-case';

import { JwtAuthGuard } from '../../applications/guards/jwt-auth.guard';
import { UsersRepository } from '../../domains/users/repositories/users.repository';

@Resolver((of) => User)
export class UsersQueryResolver {
  constructor(
    private usersRepository: UsersRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  // TODO: テスト用なので、追々削除する
  @Query((returns) => User)
  @UseGuards(JwtAuthGuard)
  async users() {
    return this.usersRepository.findAll();
  }

  @Query((returns) => User)
  @UseGuards(JwtAuthGuard)
  async user(@Args('id') id: IQueryUserArgs['id']) {
    return await this.findUserByIdUseCase.execute(id);
  }
}
