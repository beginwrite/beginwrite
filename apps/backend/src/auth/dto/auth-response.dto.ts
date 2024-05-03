import { Field, ObjectType } from '@nestjs/graphql';
import { IUser } from '@beginwrite/app-graphql-codegen';
import { User } from '../../models/users.model';

@ObjectType()
export class AuthResponse {
  @Field(() => User)
  user: IUser;
}
