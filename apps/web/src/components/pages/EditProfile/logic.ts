import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ChangeEventHandler, useCallback } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import {
  getUserQuery,
  updateUserProfileMutation,
  uploadProfileAvatarMutation,
} from './gql';

import type {
  GetUserQuery,
  UpdateUserProfileMutation,
  UploadProfileAvatarMutation,
} from './gql';

export const useFetchData = (id: string) => {
  const { error, data } = useQuery<GetUserQuery>(getUserQuery, {
    variables: { id },
    fetchPolicy: 'network-only',
    refetchWritePolicy: 'overwrite',
  });

  return { error, data };
};

export const useUpdateProfile = (id: string) => {
  const { handleSubmit, register } = useForm();
  const [fetchPost] = useMutation<UpdateUserProfileMutation>(
    updateUserProfileMutation,
    {
      refetchQueries: ['GetUserQuery'],
      onCompleted: () => {
        return;
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const submit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      await fetchPost({
        variables: {
          data: {
            id,
            displayName: data.displayName,
            bio: data.bio,
          },
        },
      });
    },
    [fetchPost, id],
  );

  return {
    handleSubmit: handleSubmit(submit),
    register,
  };
};

export const useUpdateProfileAvatar = (id: string) => {
  const [fetchPost] = useMutation<UploadProfileAvatarMutation>(
    uploadProfileAvatarMutation,
    {
      refetchQueries: ['GetUserQuery'],
      onCompleted: () => {
        return;
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const handleAvatarUpload: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      // @ts-expect-error - TS doesn't know about files
      const file = e.target.files[0];
      if (file === null || typeof file === 'undefined') return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const canvas = document.createElement('canvas');
        const img = document.createElement('img');
        img.src = reader.result as string;
        img.onload = async () => {
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx !== null) {
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            const blob = await (await fetch(dataUrl)).blob();
            const newFile = new File([blob], 'avatar.png', {
              type: 'image/png',
            });
            console.log(newFile);
            await fetchPost({
              variables: {
                id,
                file: newFile,
              },
            });
          }
        };
      };
    },
    [fetchPost, id],
  );

  return { handleAvatarUpload };
};
