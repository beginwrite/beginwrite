import { gql, useQuery } from '@apollo/client';
import { IUser } from '@beginwrite/app-graphql-codegen';

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

export const useAuthUser = (id: string) => {
  const { data, error } = useQuery<GetAuthUserQuery>(getAuthUserQuery, {
    variables: { id },
  });

  if (error) {
    console.error(error);
    return null;
  }

  return data?.user;
};
