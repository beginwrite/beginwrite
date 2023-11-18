import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/models/users.model';
import { UsersRepository } from '../../repositorys/users.repository';

@Resolver((of) => User)
export class UsersMutationResolver {
  constructor(private usersRepository: UsersRepository) {}

  @Mutation((returns) => User)
  async createUser(@Args('name') name: string) {
    return this.usersRepository.createUser(name);
  }
}
