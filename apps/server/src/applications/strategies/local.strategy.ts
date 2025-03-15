import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthRepository } from '../../domains/auth/repositories/auth.repository';
import { User } from '../../domains/users/entities/users.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authRepository: AuthRepository) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = this.authRepository.validateUser({ email, password });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
