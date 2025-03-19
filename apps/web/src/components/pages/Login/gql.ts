import { gql } from '@apollo/client';

import type { IMutationAuthArgs, IUser } from '@beginwrite/graphql-codegen';

export type PostAuthUserMutation = {
  auth: Pick<IUser, 'id' | 'uuid' | 'accessToken'>;
};

export type PostAuthUserMutationVariables = IMutationAuthArgs;

export const postAuthUserMutation = gql`
  mutation Login($data: UserAuthInput!) {
    auth(data: $data) {
      id
      uuid
      accessToken
    }
  }
`;
