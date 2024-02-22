import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/models/users.model';
import { PostsRepository } from 'src/repositorys/posts.repository';

@Resolver((of) => User)
export class UsersQueryResolver {
  constructor(private postsRepository: PostsRepository) {}

  @Query((returns) => User)
  async users() {
    return this.postsRepository.findAll();
  }
}
