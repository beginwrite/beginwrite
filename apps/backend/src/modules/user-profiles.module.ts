import { Module } from '@nestjs/common';
import { UsersRepository } from '../repositorys/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from 'src/models/user-profiles.model';
import { UserProfileQueryResolver } from 'src/resolvers/user-profiles/users-query.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  providers: [UsersRepository, UserProfileQueryResolver],
  exports: [UsersRepository, UserProfileQueryResolver],
})
export class UsersModule {}
