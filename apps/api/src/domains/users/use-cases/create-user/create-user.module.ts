import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../entities/users.entity';
import { UsersRepository } from '../../repositories/users.repository';

import { CreateUserUseCase } from './create-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CreateUserUseCase, UsersRepository],
  exports: [CreateUserUseCase, UsersRepository],
})
export class CreateUserUseCaseModule {}
