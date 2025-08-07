import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../../applications/strategies/jwt.strategy';
import { LocalStrategy } from '../../applications/strategies/local.strategy';
import { LoginUseCaseModule } from '../../applications/use-cases/users/login/login.module';
import { LogoutUseCaseModule } from '../../applications/use-cases/users/logout/logout.module';
import { User } from '../../domains/users/entities/users.entity';

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
