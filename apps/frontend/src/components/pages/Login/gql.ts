import { gql } from '@apollo/client';
import type {
  IMutationAuthUserArgs,
  IUser,
} from '@beginwrite/app-graphql-codegen';

export type PostAuthUserMutation = {
  authUser: Pick<IUser, 'id' | 'accessToken'>;
};

export type PostAuthUserMutationVariables = IMutationAuthUserArgs;

export const postAuthUserMutation = gql`
  mutation login($data: UserAuthInput!) {
    authUser(data: $data) {
      id
      accessToken
    }
  }
`;
