import { gql } from '@apollo/client';

import type { IUser } from '@beginwrite/graphql-codegen';

export type GetUserQuery = {
  user: Pick<IUser, 'id' | 'name' | 'displayName' | 'avatar' | 'bio'>;
};

export const getUserQuery = gql`
  query GetUserQuery($id: ID!) {
    user(id: $id) {
      id
      displayName
      avatar
      bio
    }
  }
`;

export type UpdateUserProfileMutation = {
  updateProfile: Pick<IUser, 'id'>;
};

export const updateUserProfileMutation = gql`
  mutation UpdateUserProfileMutation($data: UserProfileInput!) {
    updateUserProfile(data: $data) {
      id
    }
  }
`;

export type UploadProfileAvatarMutation = {
  uploadProfileAvatar: Pick<IUser, 'id'>;
};

export const uploadProfileAvatarMutation = gql`
  mutation uploadAvatar($id: ID!, $file: FileUpload!) {
    uploadProfileAvatar(id: $id, file: $file) {
      id
    }
  }
`;
