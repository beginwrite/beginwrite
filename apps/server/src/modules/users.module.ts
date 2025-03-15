import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from 'src/applications/services/redis.service';
import { S3Service } from 'src/applications/services/s3.service';

import { User } from '../domains/entities/users.entity';
import { UsersRepository } from '../domains/repositorys/users.repository';
import { UsersMutationResolver } from '../resolvers/users/users-mutation.resolver';
import { UsersQueryResolver } from '../resolvers/users/users-query.resolver';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersRepository,
    UsersQueryResolver,
    UsersMutationResolver,
    S3Service,
    RedisService,
  ],
  exports: [
    UsersRepository,
    UsersQueryResolver,
    UsersMutationResolver,
    S3Service,
    RedisService,
  ],
})
export class UsersModule {}
