import { graphql, HttpResponse } from 'msw';

import {
  UpdateUserProfileMutation,
  UploadProfileAvatarMutation,
} from '@/components/pages/EditProfile/gql';

const UploadProfileAvatar = graphql.mutation<UploadProfileAvatarMutation>(
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

const UploadProfile = graphql.mutation<UpdateUserProfileMutation>(
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

export const ProfileMutaion = [UploadProfileAvatar, UploadProfile];
