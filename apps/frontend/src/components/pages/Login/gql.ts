import { gql } from '@apollo/client';

import type { IMutationAuthArgs, IUser } from '@beginwrite/app-graphql-codegen';

export type PostAuthUserMutation = {
  authUser: Pick<IUser, 'id' | 'accessToken'>;
};

export type PostAuthUserMutationVariables = IMutationAuthArgs;

export const postAuthUserMutation = gql`
  mutation login($data: UserAuthInput!) {
    auth(data: $data) {
      id
      accessToken
    }
  }
`;
