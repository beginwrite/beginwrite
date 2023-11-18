import { Module } from '@nestjs/common';
import { UsersRepository } from '../repositorys/users.repository';
import { UsersQueryResolver } from '../resolvers/users/users-query.resolver';
import { UsersMutationResolver } from '../resolvers/users/users-mutation.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/users.model';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository, UsersQueryResolver, UsersMutationResolver],
  exports: [UsersRepository, UsersQueryResolver, UsersMutationResolver],
})
export class UsersModule {}
