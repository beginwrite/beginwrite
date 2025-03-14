import { useMutation } from '@apollo/client';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { authAtom } from '@/store/auth';

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
  const setUserId = useSetAtom(authAtom);
  const [fetchPost] = useMutation<
    PostAuthUserMutation,
    PostAuthUserMutationVariables
  >(postAuthUserMutation, {
    onCompleted: (data) => {
      //TODO: 状態管理を jotai に完全移管したい
      localStorage.setItem('access_token', data.auth.accessToken!);
      setUserId(data.auth.id!);
      if (sessionStorage.getItem('redirect_path')) {
        const redirectPath = sessionStorage.getItem('redirect_path');
        sessionStorage.removeItem('redirect_path');
        router.push(redirectPath!);
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
