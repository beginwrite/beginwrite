import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RedisService } from 'src/applications/services/redis.service';
import { AuthRepository } from 'src/domains/auth/repositories/auth.repository';
import { LoginUseCase } from 'src/use-cases/auth/login.use-case';

import { JwtStrategy } from '../applications/strategies/jwt.strategy';
import { LocalStrategy } from '../applications/strategies/local.strategy';
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
