import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../../../domains/users/entities/users.entity';
import { UsersRepository } from '../../../../infrastructure/repositories/users.repository';

import { UpdateUserProfileUseCase } from './update-user-profile.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UpdateUserProfileUseCase, UsersRepository],
  exports: [UpdateUserProfileUseCase, UsersRepository],
})
export class UpdateUserProfileUseCaseModule {}
