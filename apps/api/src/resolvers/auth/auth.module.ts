import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domains/users/entities/users.entity';
import { LoginUseCaseModule } from 'src/domains/users/use-cases/login/login.module';
import { LogoutUseCaseModule } from 'src/domains/users/use-cases/logout/logout.module';

import { JwtStrategy } from '../../applications/strategies/jwt.strategy';
import { LocalStrategy } from '../../applications/strategies/local.strategy';

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
