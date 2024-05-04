import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../../models/users.model';
import { UsersRepository } from '../../repositorys/users.repository';
import { RedisService } from '../services/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersRepository: UsersRepository,
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
    const user = await this.usersRepository.findById(payload.sub);
    const accessToken = await this.redis.store.get(user.uuid);
    if (!accessToken) return null;
    return user;
  }
}
