import { IUser } from '@beginwrite/app-graphql-codegen';
import { graphql, HttpResponse } from 'msw';

import { GetUserQuery } from '@/components/pages/EditProfile/gql';

const mocks: Map<
  number,
  Pick<IUser, 'id' | 'name' | 'displayName' | 'avatar' | 'bio'>
> = new Map([
  [
    1,
    {
      id: '1',
      name: 'Name1',
      bio: 'Bio Profile',
      displayName: 'Name 1',
      avatar: 'https://placehold.jp/200x200.png',
      email: 'sample@example.com',
    },
  ],
  [
    2,
    {
      id: '2',
      name: 'Name2',
      bio: 'Bio Profile',
      displayName: 'Name 2',
      avatar: 'https://placehold.jp/200x200.png',
      email: 'sample2@example.com',
    },
  ],
]);

export const user = () => {
  return graphql.query<GetUserQuery>('GetUserQuery', ({ variables }) => {
    const { id } = variables;
    const user = mocks.get(id);

    if (!user) {
      return HttpResponse.json({
        errors: [
          {
            message: `User not found: ${id}`,
          },
        ],
      });
    }

    return HttpResponse.json({
      data: {
        user: mocks.get(id)!,
      },
    });
  });
};
