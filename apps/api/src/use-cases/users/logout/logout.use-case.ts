import { Injectable } from '@nestjs/common';

import { User } from '../../../domains/users/entities/users.entity';
import { AuthRepository } from '../../../domains/users/repositories/auth.repository';

@Injectable()
export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(user: User): Promise<User> {
    return await this.authRepository.logout(user);
  }
}
