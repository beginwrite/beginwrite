import { graphql, HttpResponse } from 'msw';

import {
  UpdateUserProfileMutation,
  UploadProfileAvatarMutation,
} from '@/components/pages/EditProfile/gql';

export const uploadProfileAvatar = () => {
  return graphql.mutation<UploadProfileAvatarMutation>(
    'uploadAvatar',
    ({ variables }) => {
      const { id } = variables;

      return HttpResponse.json({
        data: {
          uploadProfileAvatar: {
            id,
          },
        },
      });
    },
  );
};

export const uploadProfile = () => {
  return graphql.mutation<UpdateUserProfileMutation>(
    'UpdateUserProfileMutation',
    ({ variables }) => {
      const { data } = variables;

      return HttpResponse.json({
        data: {
          updateProfile: {
            id: data.id,
          },
        },
      });
    },
  );
};
