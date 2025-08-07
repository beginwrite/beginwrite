import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../../../domains/entities/users.entity';
import { UsersRepository } from '../../../../infrastructure/repositories/users.repository';

import { CreateUserUseCase } from './create-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CreateUserUseCase, UsersRepository],
  exports: [CreateUserUseCase, UsersRepository],
})
export class CreateUserUseCaseModule {}
