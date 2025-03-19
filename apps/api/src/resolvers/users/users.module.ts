import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { S3Service } from 'src/applications/services/s3.service';
import { CreateUserUseCaseModule } from 'src/domains/users/use-cases/create-user/create-user.module';
import { FindUserByIdUseCaseModule } from 'src/domains/users/use-cases/find-user-by-id/find-user-by-id.module';
import { UpdateUserProfileUseCaseModule } from 'src/domains/users/use-cases/update-user-profile/update-user-profile.module';
import { UpdateUserProfileAvatarUseCaseModule } from 'src/domains/users/use-cases/update-user-profile-avatar/update-user-profile-avatar.module';

import { User } from '../../domains/users/entities/users.entity';

import { UsersMutationResolver } from './users-mutation.resolver';
import { UsersQueryResolver } from './users-query.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CreateUserUseCaseModule,
    FindUserByIdUseCaseModule,
    UpdateUserProfileUseCaseModule,
    UpdateUserProfileAvatarUseCaseModule,
  ],
  providers: [UsersQueryResolver, UsersMutationResolver, S3Service],
  exports: [UsersQueryResolver, UsersMutationResolver, S3Service],
})
export class UsersModule {}
