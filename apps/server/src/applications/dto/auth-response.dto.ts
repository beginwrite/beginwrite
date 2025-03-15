import { IUser } from '@beginwrite/app-graphql-codegen';
import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../domains/users/entities/users.entity';

@ObjectType()
export class AuthResponse {
  @Field(() => User)
  user: IUser;
}
