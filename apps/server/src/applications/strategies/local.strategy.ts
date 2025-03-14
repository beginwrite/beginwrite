import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { User } from '../../domains/entities/users.entity';
import { AuthRepository } from '../../domains/repositorys/auth.repository';

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
