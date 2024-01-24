import { useQuery, gql } from '@apollo/client';
import type { IUser } from '@beginwrite/app-graphql-codegen';

export type UserQuery = {
  users: Array<Pick<IUser, 'id' | 'name'>>;
};

const getUsersQuery = gql`
  query users {
    users {
      id
      name
    }
  }
`;

export default function Index() {
  const { error, data } = useQuery<UserQuery>(getUsersQuery);

  if (error) return null;

  return (
    <div>
      <ul>
        {data?.users.map((user: Pick<IUser, 'id' | 'name'>) => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}
