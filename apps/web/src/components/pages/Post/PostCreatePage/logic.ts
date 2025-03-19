import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { createPostMutation } from './gql';

import type { CreatePostMutation } from './gql';

export const useCreatePost = (userId: string) => {
  const router = useRouter();
  const form = useForm<{
    title: string;
    content: string;
  }>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const [createPost, { loading }] = useMutation<CreatePostMutation>(
    createPostMutation,
    {
      onCompleted: (data) => {
        // 投稿詳細ページに遷移
        void router.push(`/posts/${data.createPost.id}`);
      },
      onError: (error) => {
        console.error('Error creating post:', error);
      },
    },
  );

  const submit = form.handleSubmit(async (values) => {
    await createPost({
      variables: {
        data: {
          ...values,
          userId,
        },
      },
    });
  });

  const handleSetContentValue = useCallback(
    (value: string) => {
      form.setValue('content', value);
    },
    [form],
  );

  return {
    form,
    submit,
    handleSetContentValue,
    loading,
  };
};
