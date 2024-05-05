import { gql } from '@apollo/client';

import type { IUser } from '@beginwrite/app-graphql-codegen';

export type GetUserQuery = {
  user: Pick<IUser, 'id' | 'name' | 'displayName' | 'avatar' | 'bio'>;
};

export const getUserQuery = gql`
  query GetUserQuery($id: ID!) {
    user(id: $id) {
      id
      displayName
      avatar
      bio
    }
  }
`;
