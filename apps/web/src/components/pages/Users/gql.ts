import { gql } from '@apollo/client';

import type { IUser } from '@beginwrite/graphql-codegen';

export type GetUsersQuery = {
  users: Array<Pick<IUser, 'id' | 'name'>>;
};

export const getUsersQuery = gql`
  query users {
    users {
      id
      name
    }
  }
`;
