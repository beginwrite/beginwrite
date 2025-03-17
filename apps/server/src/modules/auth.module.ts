import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { RedisService } from '../applications/services/redis.service';
import { JwtStrategy } from '../applications/strategies/jwt.strategy';
import { LocalStrategy } from '../applications/strategies/local.strategy';
import { AuthRepository } from '../domains/users/repositories/auth.repository';
import { LoginUseCase } from '../domains/users/use-cases/login.use-case';
import { AuthMutationResolver } from '../resolvers/auth/auth-mutation.resolver';

import { UsersModule } from './users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthRepository,
    AuthMutationResolver,
    LoginUseCase,
    LocalStrategy,
    JwtStrategy,
    RedisService,
  ],
  exports: [
    AuthRepository,
    AuthMutationResolver,
    LoginUseCase,
    LocalStrategy,
    JwtStrategy,
    RedisService,
  ],
})
export class AuthModule {}
