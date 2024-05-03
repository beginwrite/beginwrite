import { useQuery } from '@apollo/client';
import React from 'react';

import { getUsersQuery } from './gql';

import type { GetUsersQuery } from './gql';
import type { IUser } from '@beginwrite/app-graphql-codegen';

const Users: React.FC = () => {
  const { error, data } = useQuery<GetUsersQuery>(getUsersQuery);
  if (error) return null;

  return (
    <div>
      <ul>
        {data?.users.map((user: Pick<IUser, 'id' | 'name'>) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
