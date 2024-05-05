import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from 'src/applications/services/s3.service';

import { User } from '../models/users.model';
import { UsersRepository } from '../repositorys/users.repository';
import { UsersMutationResolver } from '../resolvers/users/users-mutation.resolver';
import { UsersQueryResolver } from '../resolvers/users/users-query.resolver';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersRepository,
    UsersQueryResolver,
    UsersMutationResolver,
    S3Service,
  ],
  exports: [
    UsersRepository,
    UsersQueryResolver,
    UsersMutationResolver,
    S3Service,
  ],
})
export class UsersModule {}
