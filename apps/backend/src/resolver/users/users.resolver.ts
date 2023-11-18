import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/models/users.model';
import { UsersService } from 'src/services/users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => User)
  async users() {
    return this.usersService.findAll();
  }

  @Mutation((returns) => User)
  async createUser(@Args('name') name: string) {
    return this.usersService.createUser(name);
  }
}
