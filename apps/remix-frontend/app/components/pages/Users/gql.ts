import { gql } from '@apollo/client/core/index.js';
import type { IUser } from '@beginwrite/app-graphql-codegen';

export type GetUserQuery = {
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
