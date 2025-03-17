import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from 'src/applications/services/redis.service';
import { S3Service } from 'src/applications/services/s3.service';
import { UpdateUserProfileAvatarUseCase } from 'src/domains/users/use-cases/update-user-profile-avatar.use-case';
import { UpdateUserProfileUseCase } from 'src/domains/users/use-cases/update-user-profile.use-case';

import { User } from '../domains/users/entities/users.entity';
import { UsersRepository } from '../domains/users/repositories/users.repository';
import { CreateUserUseCase } from '../domains/users/use-cases/create-user.use-case';
import { FindUserByIdUseCase } from '../domains/users/use-cases/find-user-by-id.use-case';
import { UsersMutationResolver } from '../resolvers/users/users-mutation.resolver';
import { UsersQueryResolver } from '../resolvers/users/users-query.resolver';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersRepository,
    UsersQueryResolver,
    UsersMutationResolver,
    FindUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserProfileUseCase,
    UpdateUserProfileAvatarUseCase,
    S3Service,
    RedisService,
  ],
  exports: [
    UsersRepository,
    UsersQueryResolver,
    UsersMutationResolver,
    FindUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserProfileUseCase,
    UpdateUserProfileAvatarUseCase,
    S3Service,
    RedisService,
  ],
})
export class UsersModule {}
