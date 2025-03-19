import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RedisService } from '../../../../applications/services/redis.service';
import { User } from '../../entities/users.entity';
import { AuthRepository } from '../../repositories/auth.repository';

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
  providers: [LoginUseCase, AuthRepository, JwtService, RedisService],
  exports: [LoginUseCase, AuthRepository, JwtService, RedisService],
})
export class LoginUseCaseModule {}
