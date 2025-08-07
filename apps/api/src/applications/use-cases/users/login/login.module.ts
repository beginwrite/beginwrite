import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../../../domains/users/entities/users.entity';
import { AuthRepository } from '../../../../domains/users/repositories/auth.repository';
import { RedisService } from '../../../../infrastructure/services/redis.service';

import { LoginUseCase } from './login.use-case';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [LoginUseCase, AuthRepository, RedisService],
  exports: [LoginUseCase, AuthRepository, RedisService],
})
export class LoginUseCaseModule {}
