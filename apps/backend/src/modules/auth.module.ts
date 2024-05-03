import { Module } from '@nestjs/common';
import { AuthRepository } from 'src/repositorys/auth.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthMutationResolver } from 'src/resolvers/auth/auth-mutation.resolver';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { UsersModule } from './users.module';
import { ConfigModule } from '@nestjs/config';

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
