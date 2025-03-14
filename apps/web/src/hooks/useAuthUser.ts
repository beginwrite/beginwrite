import { gql, useQuery } from '@apollo/client';
import { IUser } from '@beginwrite/app-graphql-codegen';
import { useAtom, useAtomValue } from 'jotai';

import { authAtom } from '../store/auth';

export type GetAuthUserQuery = {
  user: Pick<IUser, 'id'>;
};

const getAuthUserQuery = gql`
  query GetAuthUser($id: ID!) {
    user(id: $id) {
      id
    }
  }
`;

export const useAuthUser = () => {
  const userId = useAtomValue(authAtom);

  const { data, error, loading } = useQuery<GetAuthUserQuery>(
    getAuthUserQuery,
    {
      variables: { id: userId },
      skip: !userId,
    },
  );

  return {
    authUser: error ? null : data?.user,
    loading,
  };
};
