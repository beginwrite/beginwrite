import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RedisService } from 'src/infrastructure/services/redis.service';

import { User } from '../../../../domains/entities/users.entity';
import { AuthRepository } from '../../../../infrastructure/repositories/auth.repository';

import { LogoutUseCase } from './logout.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [LogoutUseCase, AuthRepository, JwtService, RedisService],
  exports: [LogoutUseCase, AuthRepository, JwtService, RedisService],
})
export class LogoutUseCaseModule {}
