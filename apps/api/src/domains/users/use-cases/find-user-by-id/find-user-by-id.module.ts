import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../entities/users.entity';
import { UsersRepository } from '../../repositories/users.repository';

import { FindUserByIdUseCase } from './find-user-by-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [FindUserByIdUseCase, UsersRepository],
  exports: [FindUserByIdUseCase, UsersRepository],
})
export class FindUserByIdUseCaseModule {}
