import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../entities/users.entity';
import { UsersRepository } from '../../repositories/users.repository';

import { UpdateUserProfileUseCase } from './update-user-profile.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UpdateUserProfileUseCase, UsersRepository],
  exports: [UpdateUserProfileUseCase, UsersRepository],
})
export class UpdateUserProfileUseCaseModule {}
