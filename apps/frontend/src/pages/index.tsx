import { useQuery, gql } from '@apollo/client';
import type { IUser } from "@beginwrite/app-graphql-codegen";

export type User = {
  id: number
  name: string
}

const getUsers = gql`
  query users {
    users {
      id
      name
    }
  }
`;

export default function Index() {
  const { error, data } = useQuery(getUsers);

  if (error) return null;

  return (
    <div>
      <ul>
        {data?.users.map((user: IUser) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
