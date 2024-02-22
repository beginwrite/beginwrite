import { Query, Resolver } from '@nestjs/graphql';
import { UserProfile } from 'src/models/user-profiles.model';
import { UserProfileRepository } from 'src/repositorys/user-profiles.repository';

@Resolver((of) => UserProfile)
export class UserProfileQueryResolver {
  constructor(private userProfileRepository: UserProfileRepository) {}

  @Query((returns) => UserProfile)
  async users(id: number) {
    return this.userProfileRepository.findbyId({ id });
  }
}
