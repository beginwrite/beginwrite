import { graphql, HttpResponse } from 'msw';

import { PostAuthUserMutation } from '@/components/pages/Login/gql';

const Login = graphql.mutation<PostAuthUserMutation>(
  'Login',
  ({ variables }) => {
    return HttpResponse.json({
      data: {
        auth: {
          id: '1',
          uuid: 'wegjwepgwinepwinefgwrgep',
          accessToken: '1234567890',
        },
      },
    });
  },
);

export const LoginMutation = [Login];
