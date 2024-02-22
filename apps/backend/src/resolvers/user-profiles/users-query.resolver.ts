import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/models/users.model';
import { UserProfileRepository } from 'src/repositorys/user-profiles.repository';

@Resolver((of) => User)
export class UserProfileQueryResolver {
  constructor(private userProfileRepository: UserProfileRepository) {}

  @Query((returns) => User)
  async users(id: number) {
    return this.userProfileRepository.findbyId({ id });
  }
}
