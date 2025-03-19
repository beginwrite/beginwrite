import { IUser } from '@beginwrite/graphql-codegen';
import { graphql, HttpResponse } from 'msw';

import { GetUsersQuery } from '@/components/pages/Users/gql';

const mock: Pick<IUser, 'id' | 'name'>[] = [];

for (let i = 1; i <= 20; i++) {
  const user: Pick<IUser, 'id' | 'name'> = {
    id: i.toString(),
    name: `Name ${i}`,
  };
  mock.push(user);
}

const users = graphql.query<GetUsersQuery>('users', () => {
  return HttpResponse.json({
    data: {
      users: mock,
    },
  });
});

export const UsersQuery = [users];
