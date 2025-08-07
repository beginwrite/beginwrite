import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../../applications/strategies/jwt.strategy';
import { LocalStrategy } from '../../applications/strategies/local.strategy';
import { User } from '../../domains/users/entities/users.entity';
import { LoginUseCaseModule } from '../../use-cases/users/login/login.module';
import { LogoutUseCaseModule } from '../../use-cases/users/logout/logout.module';

import { AuthMutationResolver } from './auth-mutation.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    LoginUseCaseModule,
    LogoutUseCaseModule,
  ],
  providers: [AuthMutationResolver, LocalStrategy, JwtStrategy],
  exports: [AuthMutationResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
