import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { S3Service } from '../../applications/services/s3.service';
import { CreateUserUseCaseModule } from '../../applications/use-cases/users/create-user/create-user.module';
import { FindUserByIdUseCaseModule } from '../../applications/use-cases/users/find-user-by-id/find-user-by-id.module';
import { UpdateUserProfileUseCaseModule } from '../../applications/use-cases/users/update-user-profile/update-user-profile.module';
import { UpdateUserProfileAvatarUseCaseModule } from '../../applications/use-cases/users/update-user-profile-avatar/update-user-profile-avatar.module';
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
