import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../../domains/entities/users.entity';
import { AuthRepository } from '../repositories/auth.repository';
import { RedisService } from '../services/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly redis: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {
    email: string;
    sub: string;
  }): Promise<User | null> {
    const user = await this.authRepository.findByEmail(payload.email);
    const accessToken = await this.redis.store.get(user.uuid);
    if (!accessToken) return null;
    return user;
  }
}
