import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../models/users.model';
import { UsersRepository } from '../repositorys/users.repository';
import { UsersMutationResolver } from '../resolvers/users/users-mutation.resolver';
import { UsersQueryResolver } from '../resolvers/users/users-query.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository, UsersQueryResolver, UsersMutationResolver],
  exports: [UsersRepository, UsersQueryResolver, UsersMutationResolver],
})
export class UsersModule {}
