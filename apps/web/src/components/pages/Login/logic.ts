import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import {
  postAuthUserMutation,
  PostAuthUserMutation,
  PostAuthUserMutationVariables,
} from './gql';

export const useLogin = () => {
  const { handleSubmit, register } = useForm();
  const [fetchPost] = useMutation<
    PostAuthUserMutation,
    PostAuthUserMutationVariables
  >(postAuthUserMutation, {
    onCompleted: (data) => {
      localStorage.setItem('user_id', data.auth.id as string);
      localStorage.setItem('access_token', data.auth.accessToken as string);
      if (sessionStorage.getItem('redirect_path')) {
        const redirectPath = sessionStorage.getItem('redirect_path');
        sessionStorage.removeItem('redirect_path');
        window.location.href = redirectPath as string;
      } else {
        window.location.href = '/home';
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const submit = useCallback(
    async (data: any) => {
      await fetchPost({ variables: { data } });
    },
    [fetchPost],
  );

  return {
    handleSubmit: handleSubmit(submit),
    register,
  };
};
