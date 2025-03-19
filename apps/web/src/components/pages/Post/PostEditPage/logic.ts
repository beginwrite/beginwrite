import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { getPostQuery, updatePostMutation } from './gql';

import type { GetPostQuery, UpdatePostMutation } from './gql';

const useFetchPost = (id: string) => {
  const { error, data, loading } = useQuery<GetPostQuery>(getPostQuery, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    skip: !id,
  });

  return { error, data, loading };
};

export const useUpdatePost = (id: string, userId: string) => {
  const { data } = useFetchPost(id);
  const router = useRouter();
  const form = useForm<{
    title: string;
    content: string;
  }>({
    defaultValues: {
      title: data?.post.title ?? '',
      content: data?.post.content ?? '',
    },
  });

  const [updatePost, { loading }] = useMutation<UpdatePostMutation>(
    updatePostMutation,
    {
      onCompleted: () => {
        // 投稿詳細ページに遷移
        void router.push(`/posts/${id}`);
      },
      onError: (error) => {
        console.error('Error updating post:', error);
      },
    },
  );

  const submit = form.handleSubmit(async (values) => {
    await updatePost({
      variables: {
        id,
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

  useEffect(() => {
    if (!data) return;
    form.reset({
      title: data.post.title,
      content: data.post.content,
    });
  }, [data, form]);

  return {
    form,
    submit,
    handleSetContentValue,
    loading,
    data,
  };
};
