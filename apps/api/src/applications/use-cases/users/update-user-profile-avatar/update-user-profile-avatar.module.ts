import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { S3Service } from 'src/infrastructure/services/s3.service';

import { User } from '../../../../domains/users/entities/users.entity';
import { UsersRepository } from '../../../../infrastructure/repositories/users.repository';

import { UpdateUserProfileAvatarUseCase } from './update-user-profile-avatar.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UpdateUserProfileAvatarUseCase, UsersRepository, S3Service],
  exports: [UpdateUserProfileAvatarUseCase, UsersRepository],
})
export class UpdateUserProfileAvatarUseCaseModule {}
