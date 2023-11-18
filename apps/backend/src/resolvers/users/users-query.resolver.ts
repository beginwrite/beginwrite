import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/models/users.model';
import { UsersRepository } from '../../repositorys/users.repository';

@Resolver((of) => User)
export class UsersQueryResolver {
  constructor(private usersRepository: UsersRepository) {}

  @Query((returns) => User)
  async users() {
    return this.usersRepository.findAll();
  }
}
