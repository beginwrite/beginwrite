import { Injectable } from '@nestjs/common';

import { User } from '../../entities/users.entity';
import { AuthRepository } from '../../repositories/auth.repository';

@Injectable()
export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(user: User): Promise<User> {
    return await this.authRepository.logout(user);
  }
}
