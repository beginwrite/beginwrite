import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { S3Service } from 'src/applications/services/s3.service';

import { User } from '../../entities/users.entity';
import { UsersRepository } from '../../repositories/users.repository';

import { UpdateUserProfileAvatarUseCase } from './update-user-profile-avatar.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UpdateUserProfileAvatarUseCase, UsersRepository, S3Service],
  exports: [UpdateUserProfileAvatarUseCase, UsersRepository],
})
export class UpdateUserProfileAvatarUseCaseModule {}
