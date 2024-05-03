import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthRepository } from 'src/repositorys/auth.repository';

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
  providers: [AuthRepository, AuthMutationResolver, LocalStrategy, JwtStrategy],
  exports: [AuthRepository, AuthMutationResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
