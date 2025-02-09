import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import {
  postAuthUserMutation,
  PostAuthUserMutation,
  PostAuthUserMutationVariables,
} from './gql';

type LoginForm = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const { handleSubmit, register } = useForm<LoginForm>();
  const router = useRouter();
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
        router.push(redirectPath as string);
      } else {
        router.push('/home');
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const submit = useCallback(
    async (data: LoginForm) => {
      await fetchPost({
        variables: {
          data: {
            email: data.email,
            password: data.password,
          },
        },
      });
    },
    [fetchPost],
  );

  return {
    handleSubmit: handleSubmit(submit),
    register,
  };
};
