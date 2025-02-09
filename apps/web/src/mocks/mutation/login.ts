import { graphql, HttpResponse } from 'msw';

import { PostAuthUserMutation } from '@/components/pages/Login/gql';

export const login = () => {
  return graphql.mutation<PostAuthUserMutation>('Login', ({ variables }) => {
    const { data } = variables;

    return HttpResponse.json({
      data: {
        auth: {
          id: '1',
          uuid: 'wegjwepgwinepwinefgwrgep',
          accessToken: '1234567890',
        },
      },
    });
  });
};
