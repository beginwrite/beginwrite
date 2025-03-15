import { Injectable } from '@nestjs/common';
import { User } from 'src/domains/users/entities/users.entity';

import { AuthRepository } from '../../domains/auth/repositories/auth.repository';

@Injectable()
export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(user: User): Promise<User> {
    return await this.authRepository.auth(user);
  }
}
